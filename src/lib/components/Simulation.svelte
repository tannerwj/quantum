<script lang="ts">
	import { onMount } from 'svelte';
	import Controls from './Controls.svelte';
	import * as THREE from 'three';
	import { initScene, updateDetectorVisibility } from '$lib/simulation/scene';
	import { ParticleSystem } from '$lib/simulation/particles';
	import { WaveRings } from '$lib/simulation/waves';
	import { ProbabilityPreview } from '$lib/simulation/probability-preview';
	import { Histogram } from '$lib/simulation/histogram';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let particleSystem: ParticleSystem;
	let detectorCamera: THREE.Group;
	let waveRings: WaveRings;
	let probabilityPreview: ProbabilityPreview;
	let histogram: Histogram;

	// Simulation parameters
	const slitWidth = 1.0;  // Fixed for simplicity
	const slitSpacing = 2.8; // Fixed for simplicity
	let particleType: 'electron' | 'photon' | 'buckyball' = 'electron';
	let detectorOn = false;
	let particleRate = 10;
	let isRunning = false;
	let hitCount = 0;

	// New visualization toggles
	let showWaves = false;
	let showExpectedPattern = false;
	let showHistogram = false;
	let isFastForwarding = false;
	let fastForwardEndTime = 0;
	let savedEmissionRate = 10;

	onMount(() => {
		const result = initScene(canvas);
		scene = result.scene;
		camera = result.camera;
		renderer = result.renderer;
		detectorCamera = result.detectorCamera;

		particleSystem = new ParticleSystem(scene);
		particleSystem.setParticleType(particleType);
		particleSystem.setEmissionRate(particleRate);

		// Initialize new visualization systems
		waveRings = new WaveRings(scene);
		waveRings.setWavelength(particleType);

		probabilityPreview = new ProbabilityPreview(scene);
		probabilityPreview.setWavelength(particleType);
		probabilityPreview.setDetectorState(detectorOn);

		histogram = new Histogram(scene);

		// Register histogram to receive hit notifications
		particleSystem.onHit((y: number) => {
			histogram.addHit(y);
		});

		// Set initial detector visibility
		updateDetectorVisibility(detectorCamera, detectorOn);

		// Animation loop
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			// Check if fast-forward should end
			if (isFastForwarding && performance.now() > fastForwardEndTime) {
				isFastForwarding = false;
				particleSystem.setEmissionRate(savedEmissionRate);
			}

			if (isRunning || isFastForwarding) {
				particleSystem.update(detectorOn);
				hitCount = particleSystem.getHitCount();

				// Update wave rings if visible
				if (showWaves) {
					waveRings.update();
				}
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
			waveRings?.dispose();
			probabilityPreview?.dispose();
			histogram?.dispose();
			renderer.dispose();
		};
	});

	function handleReset() {
		particleSystem?.reset();
		histogram?.reset();
		hitCount = 0;
		isRunning = false;
		isFastForwarding = false;
	}

	function handleStart() {
		isRunning = !isRunning;
	}

	function handleFastForward() {
		if (isFastForwarding) return;

		// Save current rate and set to high speed
		savedEmissionRate = particleRate;
		particleSystem.setEmissionRate(150); // 150 particles per second

		// Start the simulation if not running
		isRunning = true;
		isFastForwarding = true;

		// Set end time (3 seconds from now)
		fastForwardEndTime = performance.now() + 3000;
	}

	// Reactive: update when any parameter changes
	$: if (particleSystem) {
		particleSystem.setParticleType(particleType);
		if (!isFastForwarding) {
			particleSystem.setEmissionRate(particleRate);
		}
	}

	// Update detector camera visibility
	$: if (detectorCamera) {
		updateDetectorVisibility(detectorCamera, detectorOn);
	}

	// Update wave rings visibility and settings
	$: if (waveRings) {
		waveRings.setVisible(showWaves);
		waveRings.setWavelength(particleType);
		waveRings.setEmissionRate(particleRate);
	}

	// Update probability preview visibility and settings
	$: if (probabilityPreview) {
		probabilityPreview.setVisible(showExpectedPattern);
		probabilityPreview.setWavelength(particleType);
		probabilityPreview.setDetectorState(detectorOn);
	}

	// Update histogram visibility
	$: if (histogram) {
		histogram.setVisible(showHistogram);
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
		{#if hitCount > 30}
			<div class="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm p-4 rounded-lg max-w-md border-4 {detectorOn ? 'border-orange-500 shadow-orange-500/50' : 'border-cyan-500 shadow-cyan-500/50'} shadow-xl">
				<div class="text-sm">
					{#if detectorOn}
						<div class="flex items-center gap-2 mb-2">
							<div class="w-5 h-5 rounded-full bg-orange-500 animate-pulse"></div>
							<span class="text-orange-400 font-bold text-lg">CLASSICAL: TWO BANDS</span>
						</div>
						<span class="text-gray-200">Detector measuring which slit → wave function collapses → particles land in 2 tight orange clusters at slit positions</span>
					{:else}
						<div class="flex items-center gap-2 mb-2">
							<div class="w-5 h-5 rounded-full bg-cyan-500 animate-pulse"></div>
							<span class="text-cyan-400 font-bold text-lg">QUANTUM: MANY BANDS</span>
						</div>
						<span class="text-gray-200">No measurement → superposition → particles create cyan interference fringes spread across entire screen</span>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<Controls
		bind:particleType
		bind:detectorOn
		bind:particleRate
		bind:showWaves
		bind:showExpectedPattern
		bind:showHistogram
		{isRunning}
		{isFastForwarding}
		on:reset={handleReset}
		on:start={handleStart}
		on:fastforward={handleFastForward}
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
