import * as THREE from 'three';
import { samplePosition, getWavelength } from './physics';

interface Particle {
	mesh: THREE.Mesh;
	velocity: THREE.Vector3;
	age: number;
}

export class ParticleSystem {
	private scene: THREE.Scene;
	private particles: Particle[] = [];
	private hits: THREE.Points | null = null;
	private hitPositions: number[] = [];
	private slitWidth = 0.5;
	private slitSpacing = 2.0;
	private wavelength = 0.3;
	private emissionRate = 10;
	private emissionCounter = 0;
	private maxParticles = 1000;
	private screenDistance = 8;

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.createHitDetector();
	}

	private createHitDetector() {
		// Create points geometry for accumulated hits on detector screen
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(this.maxParticles * 3);
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		const material = new THREE.PointsMaterial({
			color: 0x00d9ff,
			size: 0.1,
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.8,
			blending: THREE.AdditiveBlending
		});

		this.hits = new THREE.Points(geometry, material);
		this.scene.add(this.hits);
	}

	setSlitWidth(width: number) {
		this.slitWidth = width;
	}

	setSlitSpacing(spacing: number) {
		this.slitSpacing = spacing;
	}

	setParticleType(type: 'electron' | 'photon' | 'buckyball') {
		this.wavelength = getWavelength(type);
	}

	setEmissionRate(rate: number) {
		this.emissionRate = rate;
	}

	private createParticle(): Particle {
		const geometry = new THREE.SphereGeometry(0.1, 8, 8);
		const material = new THREE.MeshBasicMaterial({
			color: 0xff00ff,
			transparent: true,
			opacity: 0.8
		});

		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-10, 0, 0); // Start from left

		// Random y position near the slits
		const randomY = (Math.random() - 0.5) * this.slitSpacing * 1.5;
		mesh.position.y = randomY;

		this.scene.add(mesh);

		return {
			mesh,
			velocity: new THREE.Vector3(0.2, 0, 0), // Move right
			age: 0
		};
	}

	update(detectorOn: boolean) {
		// Emit new particles based on rate
		this.emissionCounter += this.emissionRate / 60; // Assuming 60 FPS

		while (this.emissionCounter >= 1 && this.particles.length < 100) {
			this.particles.push(this.createParticle());
			this.emissionCounter -= 1;
		}

		// Update existing particles
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const particle = this.particles[i];
			particle.mesh.position.add(particle.velocity);
			particle.age += 1;

			// Check if particle reached the screen
			if (particle.mesh.position.x >= this.screenDistance) {
				// Sample final position based on probability distribution
				const finalY = samplePosition(
					this.slitWidth,
					this.slitSpacing,
					this.wavelength,
					this.screenDistance,
					detectorOn,
					7
				);

				// Add hit to detector
				this.addHit(this.screenDistance, finalY);

				// Remove particle
				this.scene.remove(particle.mesh);
				this.particles.splice(i, 1);
			}
			// Remove if too old (shouldn't happen, but safety check)
			else if (particle.age > 300) {
				this.scene.remove(particle.mesh);
				this.particles.splice(i, 1);
			}
		}
	}

	private addHit(x: number, y: number) {
		if (!this.hits || this.hitPositions.length >= this.maxParticles * 3) {
			return;
		}

		this.hitPositions.push(x, y, 0);

		const positions = this.hits.geometry.attributes.position;
		const index = this.hitPositions.length / 3 - 1;
		positions.setXYZ(index, x, y, 0);
		positions.needsUpdate = true;

		// Update draw range to show new hits
		this.hits.geometry.setDrawRange(0, this.hitPositions.length / 3);
	}

	reset() {
		// Remove all particles
		this.particles.forEach(p => this.scene.remove(p.mesh));
		this.particles = [];

		// Clear hits
		this.hitPositions = [];
		if (this.hits) {
			const positions = this.hits.geometry.attributes.position;
			for (let i = 0; i < positions.count; i++) {
				positions.setXYZ(i, 0, 0, 0);
			}
			positions.needsUpdate = true;
			this.hits.geometry.setDrawRange(0, 0);
		}

		this.emissionCounter = 0;
	}
}
