<script lang="ts">
	import { onMount } from 'svelte';
	import Controls from './Controls.svelte';
	import * as THREE from 'three';
	import { initScene } from '$lib/simulation/scene';
	import { WaveSimulation } from '$lib/simulation/waves';
	import { ParticleSystem } from '$lib/simulation/particles';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let waveSimulation: WaveSimulation;
	let particleSystem: ParticleSystem;

	// Simulation parameters
	let slitWidth = 0.5;
	let slitSpacing = 2.0;
	let particleType: 'electron' | 'photon' | 'buckyball' = 'electron';
	let detectorOn = false;
	let particleRate = 10;
	let isRunning = false;

	onMount(() => {
		const result = initScene(canvas);
		scene = result.scene;
		camera = result.camera;
		renderer = result.renderer;

		waveSimulation = new WaveSimulation(scene);
		particleSystem = new ParticleSystem(scene);

		updateSimulationParams();

		// Animation loop
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			if (isRunning) {
				waveSimulation.update();
				particleSystem.update(detectorOn);
			}

			renderer.render(scene, camera);
		};
		animate();

		// Handle window resize
		const handleResize = () => {
			const width = canvas.parentElement?.clientWidth || window.innerWidth;
			const height = Math.min(600, window.innerHeight * 0.7);

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
		};
	});

	function updateSimulationParams() {
		if (!waveSimulation || !particleSystem) return;

		waveSimulation.setSlitWidth(slitWidth);
		waveSimulation.setSlitSpacing(slitSpacing);
		particleSystem.setSlitWidth(slitWidth);
		particleSystem.setSlitSpacing(slitSpacing);
		particleSystem.setParticleType(particleType);
		particleSystem.setEmissionRate(particleRate);
	}

	function handleReset() {
		particleSystem?.reset();
		isRunning = false;
	}

	function handleStart() {
		isRunning = !isRunning;
	}

	$: if (waveSimulation && particleSystem) {
		updateSimulationParams();
	}
</script>

<div class="w-full max-w-6xl mx-auto">
	<div class="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
		<canvas
			bind:this={canvas}
			class="w-full"
			style="max-height: 600px;"
		></canvas>
	</div>

	<Controls
		bind:slitWidth
		bind:slitSpacing
		bind:particleType
		bind:detectorOn
		bind:particleRate
		{isRunning}
		on:reset={handleReset}
		on:start={handleStart}
	/>

	<div class="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
		<h3 class="text-lg font-semibold mb-2 text-quantum-cyan">What you're seeing:</h3>
		<p class="text-gray-300">
			{#if !isRunning}
				Click "Start" to begin firing particles through the double slits.
			{:else if detectorOn}
				With the detector ON, we know which slit each particle passes through. The wave function collapses, and particles behave classically—no interference pattern appears.
			{:else}
				With the detector OFF, particles exist in superposition, passing through both slits simultaneously. This creates the characteristic interference pattern, proving wave-particle duality.
			{/if}
		</p>
	</div>
</div>
