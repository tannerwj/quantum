import * as THREE from 'three';
import { samplePosition, getWavelength } from './physics';

type RenderMode = 'point' | 'wavepacket';

interface Particle {
	mesh: THREE.Mesh;
	trail: THREE.Line | null;
	trailPositions: THREE.Vector3[];
	velocity: THREE.Vector3;
	age: number;
	finalY: number | null;
	whichSlit: number | null; // 1 for top, -1 for bottom, null for not yet determined
	renderMode: RenderMode;
	wavePacketMeshes: THREE.Mesh[]; // Additional meshes for wave packet visualization
	collapsed: boolean; // Whether the wave packet has collapsed
}

interface WhichWayLabel {
	sprite: THREE.Sprite;
	createdAt: number;
	fadeStartTime: number;
}

export class ParticleSystem {
	private scene: THREE.Scene;
	private particles: Particle[] = [];
	private hits: THREE.Points | null = null;
	private hitPositions: number[] = [];
	private hitColors: number[] = [];
	private slitWidth = 1.0;
	private slitSpacing = 2.8;
	private wavelength = 0.6;
	private particleType: 'electron' | 'photon' | 'buckyball' = 'electron';
	private emissionRate = 10;
	private emissionCounter = 0;
	private maxParticles = 3000;
	private screenDistance = 8;
	private slitIndicators: THREE.Mesh[] = []; // Visual feedback for which slit
	private whichWayLabels: WhichWayLabel[] = [];
	private hitCallbacks: ((y: number) => void)[] = [];

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.createHitDetector();
		this.createSlitIndicators();
	}

	// Register a callback to be called when a particle hits the screen
	onHit(callback: (y: number) => void) {
		this.hitCallbacks.push(callback);
	}

	private createSlitIndicators() {
		// Create visual indicators at each slit position
		const indicatorMaterial = new THREE.MeshBasicMaterial({
			color: 0xffff00,
			transparent: true,
			opacity: 0
		});

		// Top slit indicator
		const topIndicator = new THREE.Mesh(
			new THREE.SphereGeometry(0.3, 16, 16),
			indicatorMaterial.clone()
		);
		topIndicator.position.set(0, this.slitSpacing / 2, 0);
		this.scene.add(topIndicator);
		this.slitIndicators.push(topIndicator);

		// Bottom slit indicator
		const bottomIndicator = new THREE.Mesh(
			new THREE.SphereGeometry(0.3, 16, 16),
			indicatorMaterial.clone()
		);
		bottomIndicator.position.set(0, -this.slitSpacing / 2, 0);
		this.scene.add(bottomIndicator);
		this.slitIndicators.push(bottomIndicator);
	}

	private flashSlit(slitIndex: number) {
		// Flash the slit indicator when a particle passes through
		if (this.slitIndicators[slitIndex]) {
			const material = this.slitIndicators[slitIndex].material as THREE.MeshBasicMaterial;
			material.opacity = 0.8;
		}
	}

	private createHitDetector() {
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(this.maxParticles * 3);
		const colors = new Float32Array(this.maxParticles * 3);

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 0.25,
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.95,
			vertexColors: true,
			blending: THREE.AdditiveBlending
		});

		this.hits = new THREE.Points(geometry, material);
		this.scene.add(this.hits);
	}

	setParticleType(type: 'electron' | 'photon' | 'buckyball') {
		this.particleType = type;
		this.wavelength = getWavelength(type);
		console.log('Particle type updated to:', type, 'wavelength:', this.wavelength);
	}

	setEmissionRate(rate: number) {
		this.emissionRate = rate;
		console.log('Emission rate changed to:', rate, 'particles/second');
	}

	private shouldUseWavePacket(): boolean {
		return this.emissionRate <= 3;
	}

	private createWavePacketMeshes(position: THREE.Vector3, color: number): THREE.Mesh[] {
		const meshes: THREE.Mesh[] = [];
		const numLayers = 5;

		for (let i = 0; i < numLayers; i++) {
			const scale = 1 + i * 0.4;
			const opacity = 0.3 - i * 0.05;

			const geometry = new THREE.SphereGeometry(0.15 * scale, 12, 12);
			const material = new THREE.MeshBasicMaterial({
				color,
				transparent: true,
				opacity: Math.max(0.05, opacity),
				depthWrite: false
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.copy(position);
			this.scene.add(mesh);
			meshes.push(mesh);
		}

		return meshes;
	}

	private collapseWavePacket(particle: Particle) {
		if (particle.collapsed) return;
		particle.collapsed = true;

		// Animate collapse: shrink wave packet meshes to point
		particle.wavePacketMeshes.forEach((mesh, i) => {
			// Quick collapse animation
			const material = mesh.material as THREE.MeshBasicMaterial;
			material.opacity = 0;
		});
	}

	private createWhichWayLabel(slitIndex: number, position: THREE.Vector3) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d')!;
		canvas.width = 256;
		canvas.height = 64;

		// Draw label text
		context.fillStyle = '#ff8800';
		context.font = 'bold 32px Arial';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(slitIndex === 0 ? 'Slit 1' : 'Slit 2', 128, 32);

		const texture = new THREE.CanvasTexture(canvas);
		const material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			opacity: 1
		});

		const sprite = new THREE.Sprite(material);
		sprite.position.copy(position);
		sprite.position.x += 0.5;
		sprite.position.z = slitIndex === 0 ? 1 : -1;
		sprite.scale.set(1.5, 0.4, 1);

		this.scene.add(sprite);

		const now = performance.now();
		this.whichWayLabels.push({
			sprite,
			createdAt: now,
			fadeStartTime: now + 500 // Start fading after 500ms
		});
	}

	private updateWhichWayLabels() {
		const now = performance.now();
		const fadeDuration = 500; // 500ms fade

		for (let i = this.whichWayLabels.length - 1; i >= 0; i--) {
			const label = this.whichWayLabels[i];
			const age = now - label.createdAt;

			if (age > 1000) {
				// Remove after 1 second
				this.scene.remove(label.sprite);
				(label.sprite.material as THREE.SpriteMaterial).dispose();
				this.whichWayLabels.splice(i, 1);
			} else if (now > label.fadeStartTime) {
				// Fade out
				const fadeProgress = (now - label.fadeStartTime) / fadeDuration;
				const opacity = 1 - Math.min(1, fadeProgress);
				(label.sprite.material as THREE.SpriteMaterial).opacity = opacity;
			}
		}
	}

	private getParticleProperties() {
		switch (this.particleType) {
			case 'photon':
				return {
					color: 0xffff00,
					size: 0.06,
					trailColor: 0xffff00,
					speed: 0.2
				};
			case 'buckyball':
				return {
					color: 0xff6b00,
					size: 0.12,
					trailColor: 0xff6b00,
					speed: 0.12
				};
			case 'electron':
			default:
				return {
					color: 0x00d9ff,
					size: 0.08,
					trailColor: 0x00d9ff,
					speed: 0.15
				};
		}
	}

	private createParticle(): Particle {
		const props = this.getParticleProperties();
		const useWavePacket = this.shouldUseWavePacket();

		const geometry = new THREE.SphereGeometry(props.size, 8, 8);
		const material = new THREE.MeshStandardMaterial({
			color: props.color,
			emissive: props.color,
			emissiveIntensity: 0.6,
			transparent: true,
			opacity: useWavePacket ? 0.5 : 0.9
		});

		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-7.5, 0, 0);

		// Random y position near the slits
		const randomY = (Math.random() - 0.5) * this.slitSpacing * 1.2;
		mesh.position.y = randomY;

		this.scene.add(mesh);

		// Create wave packet meshes if in wave packet mode
		const wavePacketMeshes = useWavePacket
			? this.createWavePacketMeshes(mesh.position, props.color)
			: [];

		// Create trail
		const trailGeometry = new THREE.BufferGeometry();
		const trailMaterial = new THREE.LineBasicMaterial({
			color: props.trailColor,
			transparent: true,
			opacity: 0.4,
			linewidth: 2
		});
		const trail = new THREE.Line(trailGeometry, trailMaterial);
		this.scene.add(trail);

		return {
			mesh,
			trail,
			trailPositions: [],
			velocity: new THREE.Vector3(props.speed, 0, 0),
			age: 0,
			finalY: null,
			whichSlit: null,
			renderMode: useWavePacket ? 'wavepacket' : 'point',
			wavePacketMeshes,
			collapsed: false
		};
	}

	update(detectorOn: boolean) {
		// Fade slit indicators
		this.slitIndicators.forEach(indicator => {
			const material = indicator.material as THREE.MeshBasicMaterial;
			material.opacity *= 0.92; // Fade out
		});

		// Update which-way labels
		this.updateWhichWayLabels();

		// Emit new particles based on rate
		// At 60 FPS: 1/s = 0.0167 per frame, 50/s = 0.833 per frame
		this.emissionCounter += this.emissionRate / 60;

		let emittedThisFrame = 0;
		while (this.emissionCounter >= 1) {
			this.particles.push(this.createParticle());
			this.emissionCounter -= 1;
			emittedThisFrame++;
		}

		// Debug log every 60 frames (once per second)
		if (Math.random() < 0.016) {
			console.log(`Active particles: ${this.particles.length}, Rate: ${this.emissionRate}/s, Just emitted: ${emittedThisFrame}`);
		}

		// Update existing particles
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const particle = this.particles[i];

			// Check if particle is near the barrier
			if (particle.mesh.position.x >= -0.5 && particle.mesh.position.x < 0.5 && !particle.finalY) {
				// Determine if particle passes through a slit
				const halfSpacing = this.slitSpacing / 2;
				const halfWidth = this.slitWidth / 2;

				const topSlitMin = halfSpacing - halfWidth;
				const topSlitMax = halfSpacing + halfWidth;
				const bottomSlitMin = -halfSpacing - halfWidth;
				const bottomSlitMax = -halfSpacing + halfWidth;

				const y = particle.mesh.position.y;

				// Determine which slit (if any)
				let whichSlit: number | null = null;
				if (y >= topSlitMin && y <= topSlitMax) {
					whichSlit = 0; // Top slit
				} else if (y >= bottomSlitMin && y <= bottomSlitMax) {
					whichSlit = 1; // Bottom slit
				}

				if (whichSlit === null) {
					// Hit the barrier, remove particle
					this.scene.remove(particle.mesh);
					if (particle.trail) this.scene.remove(particle.trail);
					particle.wavePacketMeshes.forEach(m => this.scene.remove(m));
					this.particles.splice(i, 1);
					continue;
				}

				// Store which slit and flash it if detector is on
				particle.whichSlit = whichSlit;
				if (detectorOn) {
					this.flashSlit(whichSlit);
					// Show which-way label
					this.createWhichWayLabel(whichSlit, particle.mesh.position.clone());
					// Collapse wave packet when measured
					if (particle.renderMode === 'wavepacket') {
						this.collapseWavePacket(particle);
					}
				}

				// Passed through slit - determine final position
				particle.finalY = samplePosition(
					this.slitWidth,
					this.slitSpacing,
					this.wavelength,
					this.screenDistance,
					detectorOn,
					8
				);
			}

			// Move particle
			particle.mesh.position.add(particle.velocity);

			// Update wave packet meshes to follow particle
			if (particle.renderMode === 'wavepacket' && !particle.collapsed) {
				particle.wavePacketMeshes.forEach((mesh, idx) => {
					mesh.position.copy(particle.mesh.position);
					// Add slight oscillation for "fuzzy" effect
					const wobble = Math.sin(particle.age * 0.2 + idx) * 0.05;
					mesh.position.x += wobble;
					mesh.position.y += Math.cos(particle.age * 0.15 + idx * 2) * 0.03;
				});
			}

			// If we have a target Y position, interpolate towards it
			if (particle.finalY !== null && particle.mesh.position.x > 0) {
				const progress = (particle.mesh.position.x - 0.5) / (this.screenDistance - 0.5);
				const smoothProgress = Math.min(1, progress * progress);
				particle.mesh.position.y = THREE.MathUtils.lerp(
					particle.mesh.position.y,
					particle.finalY,
					smoothProgress * 0.1
				);
			}

			// Update trail
			particle.trailPositions.push(particle.mesh.position.clone());
			if (particle.trailPositions.length > 25) {
				particle.trailPositions.shift();
			}

			if (particle.trail) {
				const positions = new Float32Array(particle.trailPositions.length * 3);
				particle.trailPositions.forEach((pos, idx) => {
					positions[idx * 3] = pos.x;
					positions[idx * 3 + 1] = pos.y;
					positions[idx * 3 + 2] = pos.z;
				});
				particle.trail.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			}

			particle.age += 1;

			// Check if particle reached the screen
			if (particle.mesh.position.x >= this.screenDistance) {
				const finalY = particle.mesh.position.y;
				this.addHit(this.screenDistance, finalY, detectorOn);

				// Notify callbacks (e.g., histogram)
				this.hitCallbacks.forEach(cb => cb(finalY));

				this.scene.remove(particle.mesh);
				if (particle.trail) this.scene.remove(particle.trail);
				particle.wavePacketMeshes.forEach(m => {
					m.geometry.dispose();
					(m.material as THREE.Material).dispose();
					this.scene.remove(m);
				});
				this.particles.splice(i, 1);
			} else if (particle.age > 200) {
				// Remove particles that are taking too long (stuck or missed screen)
				this.scene.remove(particle.mesh);
				if (particle.trail) this.scene.remove(particle.trail);
				particle.wavePacketMeshes.forEach(m => {
					m.geometry.dispose();
					(m.material as THREE.Material).dispose();
					this.scene.remove(m);
				});
				this.particles.splice(i, 1);
			}
		}
	}

	private addHit(x: number, y: number, detectorOn: boolean) {
		if (!this.hits) return;

		const hitCount = this.hitPositions.length / 3;
		if (hitCount >= this.maxParticles) {
			// Remove oldest hit
			this.hitPositions.splice(0, 3);
			this.hitColors.splice(0, 3);
		}

		// Add some randomness to hit position for natural spread
		const randomZ = (Math.random() - 0.5) * 0.3;
		this.hitPositions.push(x, y, randomZ);

		// Color based on detector state - VERY DIFFERENT colors
		if (detectorOn) {
			// Bright orange/red when detector is on (classical behavior)
			this.hitColors.push(1, 0.2, 0);
		} else {
			// Bright cyan when detector is off (quantum interference)
			this.hitColors.push(0, 0.9, 1);
		}

		const positions = this.hits.geometry.attributes.position;
		const colors = this.hits.geometry.attributes.color;

		const newHitCount = this.hitPositions.length / 3;
		for (let i = 0; i < newHitCount; i++) {
			positions.setXYZ(i, this.hitPositions[i * 3], this.hitPositions[i * 3 + 1], this.hitPositions[i * 3 + 2]);
			colors.setXYZ(i, this.hitColors[i * 3], this.hitColors[i * 3 + 1], this.hitColors[i * 3 + 2]);
		}

		positions.needsUpdate = true;
		colors.needsUpdate = true;
		this.hits.geometry.setDrawRange(0, newHitCount);
	}

	reset() {
		this.particles.forEach(p => {
			this.scene.remove(p.mesh);
			if (p.trail) this.scene.remove(p.trail);
			p.wavePacketMeshes.forEach(m => {
				m.geometry.dispose();
				(m.material as THREE.Material).dispose();
				this.scene.remove(m);
			});
		});
		this.particles = [];

		// Clean up which-way labels
		this.whichWayLabels.forEach(label => {
			this.scene.remove(label.sprite);
			(label.sprite.material as THREE.SpriteMaterial).dispose();
		});
		this.whichWayLabels = [];

		this.hitPositions = [];
		this.hitColors = [];
		if (this.hits) {
			const positions = this.hits.geometry.attributes.position;
			const colors = this.hits.geometry.attributes.color;
			for (let i = 0; i < positions.count; i++) {
				positions.setXYZ(i, 0, 0, 0);
				colors.setXYZ(i, 0, 0, 0);
			}
			positions.needsUpdate = true;
			colors.needsUpdate = true;
			this.hits.geometry.setDrawRange(0, 0);
		}

		this.emissionCounter = 0;
	}

	getHitCount(): number {
		return this.hitPositions.length / 3;
	}
}
