import * as THREE from 'three';
import { getDoubleSilTProbability, getWavelength } from './physics';

/**
 * WaveRings - Animated concentric rings from each slit showing wave propagation
 * Rings emanate when particles are emitted, visualizing wave-particle duality
 */
export class WaveRings {
	private scene: THREE.Scene;
	private rings: THREE.Mesh[] = [];
	private ringGroup: THREE.Group;
	private slitSpacing = 2.8;
	private maxRings = 5; // Fewer rings for cleaner look
	private ringSpeed = 0.04; // Slower, calmer
	private maxRadius = 8;
	private wavelength = 0.6;
	private visible = false;
	private emissionRate = 10;
	private frameCounter = 0;

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.ringGroup = new THREE.Group();
		this.ringGroup.visible = false;
		this.scene.add(this.ringGroup);
		this.createRings();
	}

	private createRings() {
		// Create rings for both slits
		const slitPositions = [this.slitSpacing / 2, -this.slitSpacing / 2];

		for (const slitY of slitPositions) {
			for (let i = 0; i < this.maxRings; i++) {
				const ring = this.createRing(slitY, i);
				this.rings.push(ring);
				this.ringGroup.add(ring);
			}
		}
	}

	private createRing(slitY: number, index: number): THREE.Mesh {
		// Use RingGeometry for a flat ring
		const geometry = new THREE.RingGeometry(0.92, 1.0, 48);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00d9ff,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			depthWrite: false
		});

		const ring = new THREE.Mesh(geometry, material);
		ring.position.set(0, slitY, 0);
		ring.userData = {
			slitY,
			baseIndex: index,
			currentRadius: 0,
			active: false
		};

		return ring;
	}

	setSlitSpacing(spacing: number) {
		this.slitSpacing = spacing;
		const halfSpacing = spacing / 2;
		this.rings.forEach((ring, i) => {
			const isTopSlit = i < this.maxRings;
			ring.position.y = isTopSlit ? halfSpacing : -halfSpacing;
			ring.userData.slitY = ring.position.y;
		});
	}

	setWavelength(particleType: 'electron' | 'photon' | 'buckyball') {
		this.wavelength = getWavelength(particleType);
	}

	setEmissionRate(rate: number) {
		this.emissionRate = rate;
	}

	setVisible(visible: boolean) {
		this.visible = visible;
		this.ringGroup.visible = visible;
	}

	isVisible(): boolean {
		return this.visible;
	}

	// Trigger a new wave ring from each slit
	triggerWave() {
		// Find an inactive ring for each slit and activate it
		for (let slitIdx = 0; slitIdx < 2; slitIdx++) {
			const startIdx = slitIdx * this.maxRings;
			for (let i = 0; i < this.maxRings; i++) {
				const ring = this.rings[startIdx + i];
				if (!ring.userData.active) {
					ring.userData.active = true;
					ring.userData.currentRadius = 0.2;
					break;
				}
			}
		}
	}

	update() {
		if (!this.visible) return;

		this.frameCounter++;

		// Trigger waves based on emission rate (roughly matching particle emission)
		// At 60fps, rate of 10/s means trigger every 6 frames
		const triggerInterval = Math.max(3, Math.floor(60 / this.emissionRate));
		if (this.frameCounter % triggerInterval === 0) {
			this.triggerWave();
		}

		this.rings.forEach((ring) => {
			const userData = ring.userData;
			const material = ring.material as THREE.MeshBasicMaterial;

			if (!userData.active) {
				material.opacity = 0;
				ring.scale.set(0.1, 0.1, 1);
				return;
			}

			// Expand ring slowly
			userData.currentRadius += this.ringSpeed;

			// Deactivate when too large
			if (userData.currentRadius > this.maxRadius) {
				userData.active = false;
				userData.currentRadius = 0;
				material.opacity = 0;
				return;
			}

			const radius = userData.currentRadius;
			ring.scale.set(radius, radius, 1);

			// Smooth fade: start visible, fade out over distance
			const fadeProgress = radius / this.maxRadius;
			const baseOpacity = 0.25 * (1 - fadeProgress * fadeProgress);

			// Subtle phase coloring based on wavelength
			const phase = (radius / this.wavelength) * Math.PI * 2;
			const phaseModulation = 0.5 + 0.5 * Math.cos(phase);

			material.opacity = baseOpacity * (0.7 + 0.3 * phaseModulation);

			// Subtle color: cyan with slight variation
			const hue = 0.5 + 0.05 * Math.cos(phase); // Slight hue shift
			material.color.setHSL(hue, 0.8, 0.5 + 0.1 * phaseModulation);
		});
	}

	dispose() {
		this.rings.forEach((ring) => {
			ring.geometry.dispose();
			(ring.material as THREE.Material).dispose();
		});
		this.scene.remove(this.ringGroup);
	}
}

export class WaveSimulation {
	private scene: THREE.Scene;
	private wavePlane: THREE.Mesh | null = null;
	private slitWidth = 0.5;
	private slitSpacing = 2.0;
	private wavelength = 0.3;
	private time = 0;

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.createWavePlane();
	}

	private createWavePlane() {
		// Create a plane to show the wave interference pattern
		const geometry = new THREE.PlaneGeometry(15, 15, 128, 128);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00d9ff,
			transparent: true,
			opacity: 0.3,
			side: THREE.DoubleSide,
			wireframe: false
		});

		this.wavePlane = new THREE.Mesh(geometry, material);
		this.wavePlane.position.set(4, 0, -2);
		this.wavePlane.rotation.y = Math.PI / 2;
		// Initially hidden, can be toggled
		this.wavePlane.visible = false;
		this.scene.add(this.wavePlane);
	}

	setSlitWidth(width: number) {
		this.slitWidth = width;
	}

	setSlitSpacing(spacing: number) {
		this.slitSpacing = spacing;
	}

	setWavelength(particleType: 'electron' | 'photon' | 'buckyball') {
		this.wavelength = getWavelength(particleType);
	}

	update() {
		this.time += 0.01;

		if (this.wavePlane) {
			const positions = this.wavePlane.geometry.attributes.position;
			const distance = 8; // Distance to screen

			for (let i = 0; i < positions.count; i++) {
				const x = positions.getX(i);
				const y = positions.getY(i);

				// Calculate wave amplitude at this position
				const prob = getDoubleSilTProbability(
					y,
					this.slitWidth,
					this.slitSpacing,
					this.wavelength,
					distance,
					false
				);

				// Add time-varying wave motion
				const wave = Math.sin(this.time * 2 + x * 0.5) * 0.2;
				const z = prob * wave * 2;

				positions.setZ(i, z);
			}

			positions.needsUpdate = true;
		}
	}

	toggleVisibility() {
		if (this.wavePlane) {
			this.wavePlane.visible = !this.wavePlane.visible;
		}
	}
}
