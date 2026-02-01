<svelte:head>
	<title>Bell's Theorem | Quantum Physics</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<a href="/learn" class="text-quantum-cyan hover:underline mb-6 inline-block">&larr; Back to Learn</a>

	<h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
		Bell's Theorem
	</h1>

	<div class="prose prose-invert prose-lg max-w-none">
		<h2>The Most Profound Discovery in Science</h2>
		<p class="lead">
			In 1964, physicist John Stewart Bell proved something remarkable: quantum mechanics' predictions are fundamentally incompatible with any theory based on local realism. This theorem—and its experimental verification—forced us to abandon deeply held intuitions about how reality works.
		</p>

		<h2>What Is Local Realism?</h2>
		<p>
			Local realism combines two intuitive assumptions:
		</p>
		<ul>
			<li><strong>Realism:</strong> Physical properties exist independently of observation. The moon is there even when nobody looks.</li>
			<li><strong>Locality:</strong> Objects can only be influenced by their immediate surroundings. No "spooky action at a distance" faster than light.</li>
		</ul>
		<p>
			Einstein strongly believed in local realism. He thought quantum mechanics' probabilistic predictions reflected our ignorance of underlying "hidden variables" that predetermined all outcomes.
		</p>

		<h2>The EPR Argument</h2>
		<p>
			In 1935, Einstein, Podolsky, and Rosen (EPR) argued that quantum mechanics must be incomplete. They showed that measuring one entangled particle instantly determines the state of its distant partner. If we assume:
		</p>
		<ul>
			<li>Locality (no faster-than-light influences), then</li>
			<li>The distant particle must have had a predetermined value all along (hidden variables)</li>
		</ul>
		<p>
			EPR concluded: Quantum mechanics doesn't describe these hidden variables, so it's incomplete.
		</p>

		<h2>Bell's Breakthrough</h2>
		<p>
			Bell asked: Can any local hidden variable theory reproduce quantum mechanics' predictions? He proved the answer is <strong>no</strong>.
		</p>
		<p>
			Bell derived inequalities that any local realistic theory must satisfy. Quantum mechanics predicts violations of these inequalities. This made the question experimentally testable.
		</p>

		<h2>Bell's Inequality (CHSH Form)</h2>
		<p>
			Consider two entangled particles sent to distant detectors (Alice and Bob). Each chooses measurement settings (a₁/a₂ or b₁/b₂) and gets results (±1).
		</p>
		<p>
			For local hidden variables, the following inequality must hold:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|E(a₁,b₁) + E(a₁,b₂) + E(a₂,b₁) - E(a₂,b₂)| ≤ 2
		</div>
		<p>
			where E(aᵢ,bⱼ) is the correlation between Alice's and Bob's measurements.
		</p>
		<p>
			Quantum mechanics predicts violations up to 2√2 ≈ 2.828 (Tsirelson's bound).
		</p>

		<h2>Experimental Tests</h2>
		<p>
			Since the 1970s, experiments have consistently violated Bell inequalities:
		</p>
		<ul>
			<li><strong>Aspect (1982):</strong> First convincing violation using photon pairs, closing timing loopholes</li>
			<li><strong>Weihs et al. (1998):</strong> Closed locality loophole with space-like separated measurements</li>
			<li><strong>Hensen et al. (2015):</strong> Loophole-free test using entangled electron spins 1.3 km apart</li>
			<li><strong>2022:</strong> Multiple experiments definitively closed all loopholes simultaneously</li>
		</ul>
		<p>
			The verdict: Nature violates Bell inequalities. Quantum mechanics is correct; local realism is wrong.
		</p>

		<h2>What Must We Give Up?</h2>
		<p>
			Bell's theorem and experiments force us to abandon at least one cherished assumption:
		</p>
		<ul>
			<li><strong>Give up realism:</strong> Properties don't exist until measured (Copenhagen interpretation)</li>
			<li><strong>Give up locality:</strong> Distant events can instantly affect each other (though you can't send information this way)</li>
			<li><strong>Give up free will:</strong> Measurement choices are predetermined (superdeterminism—rarely accepted)</li>
		</ul>
		<p>
			Most physicists give up realism, accepting that quantum properties are contextual and relational rather than predetermined.
		</p>

		<h2>The Math: Deriving Bell's Inequality</h2>
		<p>
			Assume hidden variables λ determine outcomes. For measurement settings a and b:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			A(a,λ) = ±1<br/>
			B(b,λ) = ±1
		</div>
		<p>
			The correlation is:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			E(a,b) = ∫ρ(λ) A(a,λ) B(b,λ) dλ
		</div>
		<p>
			Through algebraic manipulation of correlations for different settings, Bell proved the inequality must hold if locality and realism are true.
		</p>
		<p>
			Quantum mechanics calculates correlations from entangled states like:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|ψ⟩ = (1/√2)(|↑↓⟩ - |↓↑⟩)
		</div>
		<p>
			giving E(a,b) = -cos(θ) where θ is the angle between measurement axes. This violates the inequality for appropriate choices of θ.
		</p>

		<h2>Philosophical Implications</h2>
		<p>
			Bell's theorem is profound because it's not about quantum mechanics specifically—it's about <strong>reality itself</strong>. Any theory (quantum or otherwise) that reproduces certain experimental correlations must be either nonlocal or non-realistic.
		</p>
		<p>
			As physicist Henry Stapp said, Bell's theorem is "the most profound discovery of science."
		</p>

		<h2>Applications</h2>
		<p>
			Beyond philosophy, Bell inequality violations enable:
		</p>
		<ul>
			<li><strong>Device-independent quantum cryptography:</strong> Security guaranteed by physics, not device trust</li>
			<li><strong>Quantum random number generation:</strong> Provably random numbers certified by Bell violations</li>
			<li><strong>Tests of quantum mechanics:</strong> Probing the limits and potential modifications</li>
		</ul>

		<h2>Beyond Bell: GHZ and Multi-Particle Tests</h2>
		<p>
			Bell's theorem has been generalized. The GHZ (Greenberger-Horne-Zeilinger) state shows even starker contradictions with local realism—not probabilistic violations but absolute contradictions.
		</p>
		<p>
			For three entangled particles:
		</p>
		<div class="bg-gray-900 p-4 rounded-lg font-mono text-sm my-6">
			|GHZ⟩ = (1/√2)(|000⟩ + |111⟩)
		</div>
		<p>
			Certain measurement combinations give deterministic predictions that are impossible for any local hidden variable theory.
		</p>

		<h2>The 2022 Nobel Prize</h2>
		<p>
			The 2022 Nobel Prize in Physics was awarded to Alain Aspect, John Clauser, and Anton Zeilinger for experimental tests of Bell inequalities and pioneering quantum information science. Their work transformed Bell's theorem from philosophy to experimentally verified reality.
		</p>

		<div class="mt-8 p-6 bg-gray-900 border-l-4 border-quantum-cyan rounded">
			<p class="text-quantum-cyan font-semibold mb-2">Learn More</p>
			<p class="mb-0">
				Dive deeper into <a href="/learn/entanglement" class="text-quantum-cyan underline">quantum entanglement</a>, the phenomenon that makes Bell violations possible.
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
