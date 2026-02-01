import * as THREE from 'three';
import { getDoubleSilTProbability, getWavelength } from './physics';

/**
 * ProbabilityPreview - Shows expected probability distribution curve on detector screen
 */
export class ProbabilityPreview {
	private scene: THREE.Scene;
	private curve: THREE.Line | null = null;
	private thickLine: THREE.Line | null = null;
	private slitWidth = 1.0;
	private slitSpacing = 2.8;
	private wavelength = 0.6;
	private screenDistance = 8;
	private screenHeight = 16;
	private detectorOn = false;
	private visible = false;
	private numPoints = 200;

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.createCurve();
	}

	private createCurve() {
		const points = this.calculateCurvePoints();
		const geometry = new THREE.BufferGeometry().setFromPoints(points);

		// Use LineBasicMaterial - note: linewidth > 1 only works on some platforms
		const material = new THREE.LineBasicMaterial({
			color: 0x00ffff,
			transparent: true,
			opacity: 0.85,
			linewidth: 3
		});

		this.curve = new THREE.Line(geometry, material);
		this.curve.visible = false;
		this.scene.add(this.curve);

		// Add a second, slightly offset line for thickness effect
		const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
		const material2 = new THREE.LineBasicMaterial({
			color: 0x00ffff,
			transparent: true,
			opacity: 0.5,
			linewidth: 3
		});
		this.thickLine = new THREE.Line(geometry2, material2);
		this.thickLine.position.z += 0.1; // Slight offset for thickness
		this.thickLine.visible = false;
		this.scene.add(this.thickLine);
	}

	private calculateCurvePoints(): THREE.Vector3[] {
		const points: THREE.Vector3[] = [];
		const halfHeight = this.screenHeight / 2;

		// Calculate the curve along the detector screen
		// Screen is at x=8, camera is at x=-14, so curve must be at x < 8 to be visible
		for (let i = 0; i <= this.numPoints; i++) {
			const y = -halfHeight + (i / this.numPoints) * this.screenHeight;

			// Get probability at this y position
			const prob = getDoubleSilTProbability(
				y,
				this.slitWidth,
				this.slitSpacing,
				this.wavelength,
				this.screenDistance,
				this.detectorOn
			);

			// Scale probability to visual size (extend out from screen toward camera)
			const curveDepth = prob * 2.5; // Max 2.5 units out from screen

			// Position: x in front of screen (toward camera), y varies, z=0
			points.push(new THREE.Vector3(
				this.screenDistance - 0.1 - curveDepth, // In front of screen, extending toward camera
				y,
				0
			));
		}

		return points;
	}

	updateCurve() {
		if (!this.curve) return;

		const points = this.calculateCurvePoints();
		const positions = new Float32Array(points.length * 3);

		points.forEach((point, i) => {
			positions[i * 3] = point.x;
			positions[i * 3 + 1] = point.y;
			positions[i * 3 + 2] = point.z;
		});

		this.curve.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		this.curve.geometry.attributes.position.needsUpdate = true;

		// Update color based on detector state
		const material = this.curve.material as THREE.LineBasicMaterial;
		if (this.detectorOn) {
			material.color.setHex(0xff8800); // Orange when detector on
		} else {
			material.color.setHex(0x00ffff); // Cyan when detector off
		}

		// Update thick line too
		if (this.thickLine) {
			this.thickLine.geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
			this.thickLine.geometry.attributes.position.needsUpdate = true;
			const mat2 = this.thickLine.material as THREE.LineBasicMaterial;
			mat2.color.copy(material.color);
		}
	}

	setSlitWidth(width: number) {
		this.slitWidth = width;
		this.updateCurve();
	}

	setSlitSpacing(spacing: number) {
		this.slitSpacing = spacing;
		this.updateCurve();
	}

	setWavelength(particleType: 'electron' | 'photon' | 'buckyball') {
		this.wavelength = getWavelength(particleType);
		this.updateCurve();
	}

	setDetectorState(on: boolean) {
		this.detectorOn = on;
		this.updateCurve();
	}

	setVisible(visible: boolean) {
		this.visible = visible;
		if (this.curve) {
			this.curve.visible = visible;
		}
		if (this.thickLine) {
			this.thickLine.visible = visible;
		}
	}

	isVisible(): boolean {
		return this.visible;
	}

	dispose() {
		if (this.curve) {
			this.curve.geometry.dispose();
			(this.curve.material as THREE.Material).dispose();
			this.scene.remove(this.curve);
		}
		if (this.thickLine) {
			this.thickLine.geometry.dispose();
			(this.thickLine.material as THREE.Material).dispose();
			this.scene.remove(this.thickLine);
		}
	}
}
