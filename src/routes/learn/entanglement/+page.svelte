<svelte:head>
	<title>Quantum Entanglement | Quantum Physics</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<a href="/learn" class="text-quantum-cyan hover:underline mb-6 inline-block">&larr; Back to Learn</a>

	<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
		Quantum Entanglement
	</h1>

	<div class="prose prose-invert prose-lg max-w-none">
		<h2>Spooky Action at a Distance</h2>
		<p class="lead">
			Einstein called it "spooky action at a distance" and never fully accepted it. Yet quantum entanglement is real, proven, and now the foundation of emerging quantum technologies. It describes a phenomenon where two particles become correlated in such a way that measuring one instantly affects the other, regardless of the distance between them.
		</p>

		<h2>What Is Entanglement?</h2>
		<p>
			When two particles are entangled, their quantum states are interdependent. You can't describe one particle independently—they form a single quantum system. Mathematically, an entangled state cannot be written as a product of individual states.
		</p>
		<p>
			For example, consider two particles with spin. An entangled state might be:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = (1/√2)(|↑↓⟩ + |↓↑⟩)
		</div>
		<p>
			This state means: "If particle A is spin-up, particle B is spin-down, and vice versa"—but neither has a definite spin until measured.
		</p>

		<h2>The EPR Paradox</h2>
		<p>
			In 1935, Einstein, Podolsky, and Rosen (EPR) proposed a thought experiment challenging quantum mechanics' completeness. They argued that if measuring one particle instantly determines the state of a distant particle, either:
		</p>
		<ul>
			<li>Information travels faster than light (violating relativity), or</li>
			<li>Particles had predetermined "hidden variables" all along</li>
		</ul>
		<p>
			EPR believed quantum mechanics was incomplete—there must be hidden variables determining outcomes in advance.
		</p>

		<h2>Bell's Resolution</h2>
		<p>
			In 1964, John Stewart Bell proved that any hidden variable theory must satisfy certain inequalities. Quantum mechanics predicts violations of these Bell inequalities.
		</p>
		<p>
			Experiments since the 1970s (Aspect, 1982; Zeilinger, 1997; and many others) have consistently violated Bell inequalities, confirming quantum mechanics and ruling out local hidden variable theories.
		</p>

		<h2>How Does It Work?</h2>
		<p>
			The key insight: entanglement doesn't transmit information. When you measure particle A, you instantly know something about particle B, but this correlation was encoded when they were created. You can't use entanglement to send messages faster than light.
		</p>
		<p>
			The correlation is non-classical but doesn't violate causality. Both particles were in superposition; measurement collapses both wave functions simultaneously (or in the many-worlds view, both exist in correlated branches).
		</p>

		<h2>Creating Entanglement</h2>
		<p>
			Entangled particles are typically created through processes that conserve quantum numbers:
		</p>
		<ul>
			<li><strong>Spontaneous Parametric Down-Conversion (SPDC):</strong> A photon splits into two entangled photons with correlated polarizations</li>
			<li><strong>Decay processes:</strong> Particles created in pairs from decay have correlated properties</li>
			<li><strong>Interaction:</strong> Particles that interact can become entangled</li>
		</ul>

		<h2>Applications</h2>
		<p>
			Entanglement isn't just philosophical—it's practical:
		</p>
		<ul>
			<li><strong>Quantum Computing:</strong> Entangled qubits enable quantum algorithms that outperform classical computers</li>
			<li><strong>Quantum Cryptography:</strong> Entanglement-based QKD (Quantum Key Distribution) offers provably secure communication</li>
			<li><strong>Quantum Teleportation:</strong> Transfer quantum states using entanglement (without moving particles)</li>
			<li><strong>Quantum Sensing:</strong> Entangled sensors achieve precision beyond classical limits</li>
		</ul>

		<h2>The Math: Entanglement Entropy</h2>
		<p>
			The degree of entanglement can be quantified using von Neumann entropy:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			S = -Tr(ρ_A log ρ_A)
		</div>
		<p>
			where ρ_A is the reduced density matrix of subsystem A. For maximally entangled states (like Bell states), S is maximal.
		</p>

		<h2>Philosophical Implications</h2>
		<p>
			Entanglement challenges our notions of:
		</p>
		<ul>
			<li><strong>Locality:</strong> Events here can instantly correlate with events there</li>
			<li><strong>Realism:</strong> Properties don't exist until measured</li>
			<li><strong>Separability:</strong> The universe can't always be divided into independent parts</li>
		</ul>
		<p>
			As physicist Anton Zeilinger puts it: "There is no sense in assuming that what we do not measure about a system has [an independent] reality."
		</p>

		<div class="mt-8 p-6 bg-gray-900 border-l-4 border-quantum-magenta rounded">
			<p class="text-quantum-magenta font-semibold mb-2">Deep Dive</p>
			<p class="mb-0">
				Learn more about <a href="/learn/bell-theorem" class="text-quantum-magenta underline">Bell's Theorem</a> and how it definitively proved quantum mechanics over hidden variable theories.
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
