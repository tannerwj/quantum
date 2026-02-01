<script lang="ts">
	import { onMount } from 'svelte';
	import Controls from './Controls.svelte';
	import * as THREE from 'three';
	import { initScene, updateSlitPositions } from '$lib/simulation/scene';
	import { ParticleSystem } from '$lib/simulation/particles';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let particleSystem: ParticleSystem;
	let slitMarkers: THREE.Mesh[] = [];

	// Simulation parameters
	let slitWidth = 0.8;
	let slitSpacing = 2.5;
	let particleType: 'electron' | 'photon' | 'buckyball' = 'electron';
	let detectorOn = false;
	let particleRate = 15;
	let isRunning = false;
	let hitCount = 0;

	onMount(() => {
		const result = initScene(canvas);
		scene = result.scene;
		camera = result.camera;
		renderer = result.renderer;
		slitMarkers = result.slitMarkers;

		particleSystem = new ParticleSystem(scene);
		updateSimulationParams();

		// Animation loop
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			if (isRunning) {
				particleSystem.update(detectorOn);
				hitCount = particleSystem.getHitCount();
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
		if (!particleSystem) return;

		particleSystem.setSlitWidth(slitWidth);
		particleSystem.setSlitSpacing(slitSpacing);
		particleSystem.setParticleType(particleType);
		particleSystem.setEmissionRate(particleRate);

		if (slitMarkers.length > 0) {
			updateSlitPositions(slitMarkers, slitSpacing, slitWidth);
		}
	}

	function handleReset() {
		particleSystem?.reset();
		hitCount = 0;
		isRunning = false;
	}

	function handleStart() {
		isRunning = !isRunning;
	}

	$: if (particleSystem) {
		updateSimulationParams();
	}
</script>

<div class="w-full max-w-6xl mx-auto">
	<div class="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 relative">
		<canvas
			bind:this={canvas}
			class="w-full"
			style="max-height: 600px;"
		></canvas>

		<!-- Legend overlay -->
		<div class="absolute top-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg text-sm space-y-2">
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-quantum-cyan"></div>
				<span>Particle Source</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-quantum-magenta"></div>
				<span>Double Slits</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 bg-gray-700"></div>
				<span>Detector Screen</span>
			</div>
		</div>

		<!-- Hit counter -->
		<div class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg">
			<div class="text-quantum-cyan text-2xl font-mono">{hitCount}</div>
			<div class="text-xs text-gray-400">particles detected</div>
		</div>

		<!-- Pattern indicator -->
		{#if hitCount > 50}
			<div class="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg max-w-sm border-2 {detectorOn ? 'border-orange-500' : 'border-cyan-500'}">
				<div class="text-sm">
					{#if detectorOn}
						<div class="flex items-center gap-2 mb-1">
							<div class="w-4 h-4 rounded-full bg-orange-500"></div>
							<span class="text-orange-400 font-bold">DETECTOR ON</span>
						</div>
						<span class="text-gray-200">Two-band pattern — Particles behave classically, no interference</span>
					{:else}
						<div class="flex items-center gap-2 mb-1">
							<div class="w-4 h-4 rounded-full bg-cyan-500"></div>
							<span class="text-cyan-400 font-bold">DETECTOR OFF</span>
						</div>
						<span class="text-gray-200">Interference pattern — Multiple bands from quantum wave behavior</span>
					{/if}
				</div>
			</div>
		{/if}
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
		<p class="text-gray-300 text-sm leading-relaxed">
			{#if !isRunning}
				Click <strong>"Start"</strong> to fire particles from the source (back left) through the double slits toward the detector screen (right foreground). Watch how they accumulate into a pattern.
			{:else if detectorOn}
				<strong class="text-orange-400">Detector ON (orange hits):</strong> We're measuring which slit each particle passes through. The quantum wave function collapses, particles behave classically, and you'll see <strong>two orange bands</strong> on the screen corresponding to the two slits.
			{:else}
				<strong class="text-cyan-400">Detector OFF (cyan hits):</strong> No measurement means particles remain in quantum superposition, passing through both slits simultaneously. This creates <strong>multiple cyan interference bands</strong>—proof of wave-particle duality.
			{/if}
		</p>
	</div>
</div>
