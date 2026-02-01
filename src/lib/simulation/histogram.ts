import * as THREE from 'three';

/**
 * Histogram - Real-time hit distribution visualization
 */
export class Histogram {
	private scene: THREE.Scene;
	private bars: THREE.Mesh[] = [];
	private barGroup: THREE.Group;
	private buckets: number[] = [];
	private numBuckets = 40;
	private screenHeight = 16;
	private screenDistance = 8;
	private maxBarWidth = 2.0;
	private visible = false;
	private maxCount = 1; // Track max for normalization

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.barGroup = new THREE.Group();
		this.barGroup.visible = false;
		this.scene.add(this.barGroup);
		this.initializeBuckets();
		this.createBars();
	}

	private initializeBuckets() {
		this.buckets = new Array(this.numBuckets).fill(0);
		this.maxCount = 1;
	}

	private createBars() {
		const barHeight = this.screenHeight / this.numBuckets;
		const halfHeight = this.screenHeight / 2;

		for (let i = 0; i < this.numBuckets; i++) {
			// Bars extend in -X direction (toward camera which is at x=-14)
			const geometry = new THREE.BoxGeometry(0.01, barHeight * 0.85, 0.15);
			const material = new THREE.MeshBasicMaterial({
				color: 0x00ff88,
				transparent: true,
				opacity: 0.8,
				depthWrite: false
			});

			const bar = new THREE.Mesh(geometry, material);

			// Position bar in front of the screen (on the camera side)
			const y = -halfHeight + (i + 0.5) * barHeight;
			bar.position.set(this.screenDistance - 0.15, y, 0.5);

			this.bars.push(bar);
			this.barGroup.add(bar);
		}
	}

	addHit(y: number) {
		// Determine which bucket this hit belongs to
		const halfHeight = this.screenHeight / 2;
		const normalizedY = (y + halfHeight) / this.screenHeight;
		const bucketIndex = Math.floor(normalizedY * this.numBuckets);

		// Clamp to valid range
		const clampedIndex = Math.max(0, Math.min(this.numBuckets - 1, bucketIndex));
		this.buckets[clampedIndex]++;

		// Update max count for normalization
		if (this.buckets[clampedIndex] > this.maxCount) {
			this.maxCount = this.buckets[clampedIndex];
		}

		// Update the visual bar
		this.updateBar(clampedIndex);
	}

	private updateBar(index: number) {
		const bar = this.bars[index];
		if (!bar) return;

		// Scale bar width based on count (normalized) - grows toward camera (-X direction)
		const normalizedCount = this.buckets[index] / this.maxCount;
		const width = normalizedCount * this.maxBarWidth;

		bar.scale.x = Math.max(1, width * 100); // Scale from base geometry

		// Reposition so bar grows outward from screen toward camera
		bar.position.x = this.screenDistance - 0.15 - width / 2;

		// Color intensity based on count
		const material = bar.material as THREE.MeshBasicMaterial;
		const intensity = 0.5 + normalizedCount * 0.5;
		material.opacity = intensity;

		// Color gradient: low=green, high=cyan
		const r = 0;
		const g = 1 - normalizedCount * 0.4;
		const b = 0.5 + normalizedCount * 0.5;
		material.color.setRGB(r, g, b);
	}

	updateAllBars() {
		// Recalculate max
		this.maxCount = Math.max(1, ...this.buckets);

		// Update all bars
		for (let i = 0; i < this.numBuckets; i++) {
			this.updateBar(i);
		}
	}

	setVisible(visible: boolean) {
		this.visible = visible;
		this.barGroup.visible = visible;
	}

	isVisible(): boolean {
		return this.visible;
	}

	reset() {
		this.initializeBuckets();

		// Reset all bars to minimal size
		this.bars.forEach((bar) => {
			bar.scale.x = 1;
			bar.position.x = this.screenDistance - 0.15;
			const material = bar.material as THREE.MeshBasicMaterial;
			material.opacity = 0.5;
			material.color.setRGB(0, 1, 0.5);
		});
	}

	getBuckets(): number[] {
		return [...this.buckets];
	}

	getTotalHits(): number {
		return this.buckets.reduce((sum, count) => sum + count, 0);
	}

	dispose() {
		this.bars.forEach((bar) => {
			bar.geometry.dispose();
			(bar.material as THREE.Material).dispose();
		});
		this.scene.remove(this.barGroup);
	}
}
