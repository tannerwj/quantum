<script lang="ts">
	import Simulation from '$lib/components/Simulation.svelte';
</script>

<svelte:head>
	<title>Quantum Double-Slit Experiment</title>
	<meta name="description" content="Interactive double-slit experiment demonstrating wave-particle duality and the observer effect" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="text-center mb-8">
		<h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
			The Double-Slit Experiment
		</h1>
		<p class="text-xl text-gray-300 max-w-3xl mx-auto">
			Explore the bizarre world of quantum mechanics through an interactive simulation of the famous double-slit experiment.
		</p>
	</div>

	<Simulation />

	<div class="mt-12 text-center">
		<a href="/learn" class="inline-block px-8 py-3 bg-quantum-cyan text-black font-semibold rounded-lg hover:bg-quantum-cyan/80 transition-colors">
			Learn More About Quantum Physics
		</a>
	</div>
</div>
