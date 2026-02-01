<svelte:head>
	<title>Wave Function Collapse & Measurement | Quantum Physics</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<a href="/learn" class="text-quantum-cyan hover:underline mb-6 inline-block">&larr; Back to Learn</a>

	<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
		Wave Function Collapse
	</h1>

	<div class="prose prose-invert prose-lg max-w-none">
		<h2>The Measurement Problem</h2>
		<p class="lead">
			Perhaps the deepest mystery in quantum mechanics: How does measurement transform a quantum superposition into a single, definite outcome? This is the measurement problem, and despite a century of quantum mechanics, we still don't fully understand it.
		</p>

		<h2>What Is Wave Function Collapse?</h2>
		<p>
			Before measurement, a quantum system exists in superposition—a combination of multiple possible states described by the wave function ψ. Upon measurement, the system "collapses" to one definite state.
		</p>
		<p>
			Mathematically, if the system is in superposition:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = Σ cₙ|ψₙ⟩
		</div>
		<p>
			After measurement, it becomes one of the |ψₙ⟩ states with probability |cₙ|². This transition from superposition to eigenstate is called <strong>collapse</strong>.
		</p>

		<h2>The Observer Effect</h2>
		<p>
			In quantum mechanics, observation isn't passive—it fundamentally affects the system. This is different from classical physics, where (in principle) you can measure without disturbing.
		</p>
		<p>
			Key examples:
		</p>
		<ul>
			<li><strong>Double-slit:</strong> Observing which slit a particle goes through destroys the interference pattern</li>
			<li><strong>Heisenberg uncertainty:</strong> Measuring position precisely makes momentum uncertain, and vice versa</li>
			<li><strong>Quantum eraser:</strong> Even retroactive erasure of measurement information can restore interference</li>
		</ul>

		<h2>What Counts as Measurement?</h2>
		<p>
			This is where things get philosophically murky. What qualifies as a "measurement" that collapses the wave function?
		</p>
		<ul>
			<li>Does it require a conscious observer?</li>
			<li>Is any interaction with the environment sufficient?</li>
			<li>Does measurement even cause collapse, or is collapse just how we describe our limited knowledge?</li>
		</ul>
		<p>
			The Copenhagen interpretation treats measurement as a fundamental, irreducible process. But this raises the question: Where's the boundary between quantum systems that obey superposition and classical measuring devices that don't?
		</p>

		<h2>The von Neumann-Wigner Interpretation</h2>
		<p>
			Physicist Eugene Wigner suggested consciousness might play a role. In his "Wigner's friend" thought experiment, an observer measures a quantum system inside a lab. From outside, another observer (Wigner) treats the entire lab—including his friend—as a quantum system in superposition.
		</p>
		<p>
			Does collapse happen when the friend observes, or when Wigner observes? This paradox highlights the ambiguity in defining "measurement."
		</p>

		<h2>Alternatives to Collapse</h2>
		<p>
			Not all interpretations accept wave function collapse as real:
		</p>
		<ul>
			<li><strong>Many-Worlds (Everett):</strong> There's no collapse. All outcomes occur in different branches of reality. Measurement just reveals which branch you're in.</li>
			<li><strong>Decoherence:</strong> Interaction with the environment causes apparent collapse. The wave function doesn't truly collapse; it just becomes entangled with the environment, making superposition unobservable.</li>
			<li><strong>Pilot Wave (de Broglie-Bohm):</strong> Particles always have definite positions. "Collapse" is just our ignorance about those positions resolving.</li>
			<li><strong>QBism:</strong> The wave function represents an observer's beliefs, not reality. "Collapse" is updating beliefs, like in Bayesian probability.</li>
		</ul>

		<h2>The Born Rule</h2>
		<p>
			The Born rule, proposed by Max Born in 1926, gives the probability of measurement outcomes:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			P(outcome n) = |⟨n|ψ⟩|² = |cₙ|²
		</div>
		<p>
			Why the square of the amplitude? Nobody knows. The Born rule is a postulate, experimentally verified but not derived from deeper principles (yet).
		</p>

		<h2>Projection Operators</h2>
		<p>
			Mathematically, measurement is described by projection operators. For an observable A with eigenvalues aₙ:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			After measurement: |ψ⟩ → Pₙ|ψ⟩<br/>
			where Pₙ = |n⟩⟨n|
		</div>
		<p>
			This projects the state onto the measured eigenstate, with probability |⟨n|ψ⟩|².
		</p>

		<h2>Quantum Zeno Effect</h2>
		<p>
			A bizarre consequence of measurement: continuous observation can freeze quantum evolution. If you repeatedly measure a system, projecting it back to its initial state, it never has time to evolve.
		</p>
		<p>
			This is called the <strong>Quantum Zeno Effect</strong>, after Zeno's paradox. It's been experimentally verified and used to protect quantum states from decay.
		</p>

		<h2>Weak Measurements</h2>
		<p>
			Recent research explores "weak measurements" that extract partial information without fully collapsing the wave function. These allow probing quantum systems more gently and even reconstructing weak values—bizarre averages that can lie outside the normal range of eigenvalues.
		</p>

		<h2>Why It Matters</h2>
		<p>
			Understanding measurement is crucial for:
		</p>
		<ul>
			<li><strong>Quantum computing:</strong> Measurement extracts results but collapses superposition—algorithms must be designed carefully</li>
			<li><strong>Quantum error correction:</strong> Detecting errors requires measurement that doesn't destroy encoded information</li>
			<li><strong>Fundamental physics:</strong> Measurement may be key to unifying quantum mechanics with gravity</li>
		</ul>

		<h2>The Open Question</h2>
		<p>
			After 100 years, the measurement problem remains unsolved. Does collapse happen? If so, how and when? Or is collapse just an artifact of classical thinking imposed on a quantum world?
		</p>
		<p>
			As physicist Anthony Leggett said: "We have a spectacularly successful recipe for making predictions, but we don't really understand what's going on."
		</p>

		<div class="mt-8 p-6 bg-gray-900 border-l-4 border-quantum-magenta rounded">
			<p class="text-quantum-magenta font-semibold mb-2">See It in Action</p>
			<p class="mb-0">
				The <a href="/" class="text-quantum-magenta underline">interactive double-slit simulation</a> demonstrates measurement's effect: toggle the detector to see how observation collapses the interference pattern.
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
