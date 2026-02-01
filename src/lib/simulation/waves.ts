import * as THREE from 'three';
import { getDoubleSilTProbability, getWavelength } from './physics';

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
