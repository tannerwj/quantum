<script lang="ts">
	const topics = [
		{
			title: 'The Double-Slit Experiment',
			href: '/learn/double-slit',
			description: 'The foundational experiment that revealed wave-particle duality',
			icon: '〰️'
		},
		{
			title: 'Quantum Entanglement',
			href: '/learn/entanglement',
			description: 'Spooky action at a distance and non-local correlations',
			icon: '🔗'
		},
		{
			title: 'Superposition',
			href: '/learn/superposition',
			description: "Schrödinger's cat and the quantum realm before measurement",
			icon: '🐱'
		},
		{
			title: 'Wave Function Collapse',
			href: '/learn/measurement',
			description: 'The measurement problem and the observer effect',
			icon: '📊'
		},
		{
			title: "Bell's Theorem",
			href: '/learn/bell-theorem',
			description: 'Proving quantum mechanics cannot be explained by hidden variables',
			icon: '🔔'
		},
		{
			title: 'Decoherence',
			href: '/learn/decoherence',
			description: 'Why we don\'t see quantum effects in everyday life',
			icon: '🌊'
		}
	];
</script>

<svelte:head>
	<title>Learn Quantum Physics</title>
	<meta name="description" content="Deep dive into quantum mechanics concepts" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
			Learn Quantum Physics
		</h1>
		<p class="text-xl text-gray-300 mb-12">
			Explore the fundamental concepts of quantum mechanics, from wave-particle duality to the many-worlds interpretation.
		</p>

		<div class="grid gap-6 md:grid-cols-2">
			{#each topics as topic}
				<a
					href={topic.href}
					class="group p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-quantum-cyan transition-all hover:shadow-lg hover:shadow-quantum-cyan/20"
				>
					<div class="text-4xl mb-3">{topic.icon}</div>
					<h2 class="text-2xl font-bold mb-2 group-hover:text-quantum-cyan transition-colors">
						{topic.title}
					</h2>
					<p class="text-gray-400">
						{topic.description}
					</p>
				</a>
			{/each}
		</div>
	</div>
</div>
