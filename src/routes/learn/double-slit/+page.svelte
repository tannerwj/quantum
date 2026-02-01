<svelte:head>
	<title>The Double-Slit Experiment | Quantum Physics</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<a href="/learn" class="text-quantum-cyan hover:underline mb-6 inline-block">&larr; Back to Learn</a>

	<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
		The Double-Slit Experiment
	</h1>

	<div class="prose prose-invert prose-lg max-w-none">
		<h2>The Most Beautiful Experiment in Physics</h2>
		<p class="lead">
			The double-slit experiment is often called "the only mystery" of quantum mechanics. First performed with light by Thomas Young in 1801, and later with electrons, it revealed something extraordinary: particles can behave like waves, and the act of observation changes reality.
		</p>

		<h2>The Classical Setup</h2>
		<p>
			Imagine shooting particles (like electrons or photons) one at a time through two narrow slits toward a detector screen. Classically, you'd expect each particle to go through one slit or the other, creating two bright bands on the screen corresponding to each slit.
		</p>
		<p>
			But that's not what happens.
		</p>

		<h2>The Quantum Reality</h2>
		<p>
			Instead, an <strong>interference pattern</strong> emerges—alternating bright and dark bands, exactly like what you'd see if waves were passing through both slits and interfering with each other. This happens even when particles are sent one at a time, ruling out particle-particle interactions.
		</p>
		<p>
			The mathematical description involves the wave function ψ (psi), which describes the probability amplitude of finding a particle at any location:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ|² = probability density
		</div>
		<p>
			When both slits are open, the wave function is a superposition:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			ψ_total = ψ_slit1 + ψ_slit2
		</div>

		<h2>The Observer Effect</h2>
		<p>
			Here's where it gets truly bizarre. If you place a detector at the slits to determine which slit each particle passes through, the interference pattern disappears. The particles suddenly behave classically, going through one slit or the other and creating just two bands.
		</p>
		<p>
			This isn't because the detector physically disturbs the particles. Even "gentle" measurements that don't transfer momentum still collapse the interference pattern. The mere act of gaining "which-path information" fundamentally changes the outcome.
		</p>

		<h2>What Does It Mean?</h2>
		<p>
			Several interpretations attempt to explain this:
		</p>
		<ul>
			<li><strong>Copenhagen Interpretation:</strong> Particles exist in superposition (both paths simultaneously) until measurement collapses the wave function</li>
			<li><strong>Many-Worlds:</strong> The particle takes both paths in different branches of reality</li>
			<li><strong>Pilot Wave Theory:</strong> Particles have definite trajectories guided by a wave field</li>
		</ul>

		<h2>The Math: Interference Pattern</h2>
		<p>
			The intensity pattern on the screen follows:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			I(y) = I₀ · cos²(πd·y / λL)<br/>
			<br/>
			where:<br/>
			d = slit separation<br/>
			y = position on screen<br/>
			λ = wavelength<br/>
			L = distance to screen
		</div>
		<p>
			The de Broglie wavelength for particles with momentum p is:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			λ = h / p
		</div>
		<p>
			where h is Planck's constant. This means even massive objects have wavelengths, though they're typically too small to observe interference effects.
		</p>

		<h2>Why It Matters</h2>
		<p>
			This experiment demolishes classical intuition about reality:
		</p>
		<ul>
			<li>Reality is fundamentally probabilistic, not deterministic</li>
			<li>Observation plays a role in determining outcomes</li>
			<li>Particles don't have definite properties until measured</li>
			<li>Quantum systems can exist in superposition states</li>
		</ul>
		<p>
			As Richard Feynman said, "Nobody understands quantum mechanics." But we can use it, predict with it, and even exploit it for technologies like quantum computers.
		</p>

		<div class="mt-8 p-6 bg-gray-900 border-l-4 border-quantum-cyan rounded">
			<p class="text-quantum-cyan font-semibold mb-2">Try It Yourself</p>
			<p class="mb-0">
				Head back to the <a href="/" class="text-quantum-cyan underline">home page</a> to explore our interactive simulation. Toggle the detector on and off to see how measurement affects the interference pattern in real-time.
			</p>
		</div>
	</div>
</div>

<style>
	.prose h2 {
		@apply text-3xl font-bold mt-8 mb-4 text-quantum-cyan;
	}
	.prose h3 {
		@apply text-2xl font-bold mt-6 mb-3;
	}
	.prose p {
		@apply mb-4 text-gray-300 leading-relaxed;
	}
	.prose ul, .prose ol {
		@apply my-4 space-y-2 text-gray-300;
	}
	.prose li {
		@apply ml-6;
	}
	.prose a {
		@apply text-quantum-cyan hover:underline;
	}
	.prose .lead {
		@apply text-xl text-gray-200 mb-6;
	}
	.prose strong {
		@apply text-white font-semibold;
	}
</style>
