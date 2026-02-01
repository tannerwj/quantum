<svelte:head>
	<title>Superposition | Quantum Physics</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<a href="/learn" class="text-quantum-cyan hover:underline mb-6 inline-block">&larr; Back to Learn</a>

	<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
		Quantum Superposition
	</h1>

	<div class="prose prose-invert prose-lg max-w-none">
		<h2>Schrödinger's Cat and the Quantum Realm</h2>
		<p class="lead">
			Superposition is the principle that a quantum system can exist in multiple states simultaneously until observed. It's the reason electrons don't have definite positions before measurement, why qubits can be both 0 and 1, and why Schrödinger's cat is famously both alive and dead.
		</p>

		<h2>The Principle of Superposition</h2>
		<p>
			In quantum mechanics, if a system can be in state |ψ₁⟩ or state |ψ₂⟩, it can also exist in any linear combination:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = α|ψ₁⟩ + β|ψ₂⟩
		</div>
		<p>
			where α and β are complex numbers (probability amplitudes) satisfying |α|² + |β|² = 1. This isn't just uncertainty about which state the system is in—it's genuinely in both states simultaneously.
		</p>

		<h2>Schrödinger's Cat: A Thought Experiment</h2>
		<p>
			Erwin Schrödinger proposed his famous cat paradox in 1935 to illustrate the absurdity (as he saw it) of applying quantum superposition to macroscopic objects.
		</p>
		<p>
			The setup: A cat is in a sealed box with a radioactive atom, a Geiger counter, and poison. If the atom decays, the Geiger counter triggers, releasing the poison and killing the cat. Quantum mechanics says the atom is in superposition—both decayed and not decayed—until observed.
		</p>
		<p>
			Therefore, the cat must also be in superposition: both alive and dead. The state is:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ_cat⟩ = (1/√2)(|alive⟩ + |dead⟩)
		</div>
		<p>
			Only when we open the box and observe does the wave function "collapse" to one outcome.
		</p>

		<h2>Why Don't We See Superposition?</h2>
		<p>
			If superposition is fundamental, why don't we see macroscopic objects in multiple states? The answer is <strong>decoherence</strong>.
		</p>
		<p>
			Large objects interact with their environment (air molecules, photons, thermal vibrations), rapidly "measuring" them and destroying quantum coherence. The cat is constantly interacting with air, heat, and light—it's effectively being measured continuously.
		</p>
		<p>
			This is why superposition is fragile and usually confined to isolated microscopic systems. It's not that superposition stops working at large scales—it's that maintaining coherence becomes exponentially harder.
		</p>

		<h2>Superposition in the Double-Slit</h2>
		<p>
			In the double-slit experiment, a particle is in superposition of going through both slits:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = (1/√2)(|slit₁⟩ + |slit₂⟩)
		</div>
		<p>
			This superposition creates the interference pattern. When you measure which slit the particle goes through, you collapse this superposition, and interference disappears.
		</p>

		<h2>Quantum Computing and Superposition</h2>
		<p>
			Superposition is the foundation of quantum computing power. A classical bit is either 0 or 1. A qubit can be:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = α|0⟩ + β|1⟩
		</div>
		<p>
			With n qubits in superposition, a quantum computer can process 2ⁿ states simultaneously. Three qubits can represent 8 states at once; 300 qubits could represent more states than there are atoms in the universe.
		</p>
		<p>
			This parallelism enables quantum algorithms (like Shor's algorithm for factoring and Grover's search algorithm) that can solve certain problems exponentially faster than classical computers.
		</p>

		<h2>Interpretations of Superposition</h2>
		<p>
			Different interpretations of quantum mechanics explain superposition differently:
		</p>
		<ul>
			<li><strong>Copenhagen:</strong> Particles exist in abstract superposition until measurement forces a definite outcome</li>
			<li><strong>Many-Worlds:</strong> All possibilities happen; superposition is just our ignorance of which branch we're in</li>
			<li><strong>Pilot Wave:</strong> Particles have definite positions, guided by a wave that exists in superposition</li>
			<li><strong>Relational:</strong> States are relative to observers; superposition depends on your reference frame</li>
		</ul>

		<h2>Mathematical Details</h2>
		<p>
			In a general superposition, the probability of measuring state |ψₙ⟩ is:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			P(n) = |⟨ψₙ|ψ⟩|² = |αₙ|²
		</div>
		<p>
			Superposition states can exhibit quantum interference. If a system can reach a final state via two paths, the probability amplitude is:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			A_total = A₁ + A₂<br/>
			P = |A₁ + A₂|² ≠ |A₁|² + |A₂|²
		</div>
		<p>
			This inequality represents the essence of quantum interference—probabilities don't simply add.
		</p>

		<h2>Experimental Evidence</h2>
		<p>
			Superposition isn't just theoretical. It's been experimentally verified in:
		</p>
		<ul>
			<li>Electron and photon interference experiments</li>
			<li>Superconducting qubits in quantum computers</li>
			<li>Trapped ions and atoms</li>
			<li>Molecules as large as fullerenes (C₆₀) and beyond</li>
		</ul>

		<div class="mt-8 p-6 bg-gray-900 border-l-4 border-quantum-cyan rounded">
			<p class="text-quantum-cyan font-semibold mb-2">Explore More</p>
			<p class="mb-0">
				Learn about <a href="/learn/decoherence" class="text-quantum-cyan underline">decoherence</a> and why quantum superposition is so fragile in the real world.
			</p>
		</div>
	</div>
</div>

<style>
	.prose h2 {
		@apply text-3xl font-bold mt-8 mb-4 text-quantum-cyan;
	}
	.prose p {
		@apply mb-4 text-gray-300 leading-relaxed;
	}
	.prose ul {
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
