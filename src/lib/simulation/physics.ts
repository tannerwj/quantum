/**
 * Quantum physics calculations for the double-slit experiment
 */

/**
 * Calculate the probability amplitude for a particle at position y on the screen
 * using the Huygens-Fresnel principle
 */
export function calculateInterferencePattern(
	y: number,
	slitSpacing: number,
	wavelength: number,
	distance: number
): number {
	const d = slitSpacing;
	const L = distance;

	// Path difference from each slit to the point
	const r1 = Math.sqrt(L * L + (y - d / 2) ** 2);
	const r2 = Math.sqrt(L * L + (y + d / 2) ** 2);
	const pathDiff = r2 - r1;

	// Phase difference (amplified for visibility)
	const phase = (2 * Math.PI * pathDiff) / wavelength;

	// Amplitude from interference (sum of complex amplitudes)
	// |ψ|² ∝ cos²(δ/2) where δ is phase difference
	const amplitude = Math.cos(phase / 2) ** 2;

	return amplitude;
}

/**
 * Calculate single-slit diffraction envelope
 */
export function calculateDiffractionEnvelope(
	y: number,
	slitWidth: number,
	wavelength: number,
	distance: number
): number {
	const a = slitWidth;
	const L = distance;

	if (Math.abs(y) < 0.01) return 1;

	const beta = (Math.PI * a * y) / (wavelength * L);

	// sinc function: sin(β)/β
	const envelope = Math.sin(beta) / beta;
	return envelope ** 2;
}

/**
 * Combined probability distribution for double-slit with diffraction
 */
export function getDoubleSilTProbability(
	y: number,
	slitWidth: number,
	slitSpacing: number,
	wavelength: number,
	distance: number,
	detectorOn: boolean
): number {
	if (detectorOn) {
		// With measurement: TWO DISTINCT BANDS (no interference!)
		// Particles land near the two slit positions
		const slit1Center = slitSpacing / 2;
		const slit2Center = -slitSpacing / 2;

		// Gaussian spread around each slit (narrow bands)
		const spreadWidth = slitWidth * 0.8;
		const gauss1 = Math.exp(-((y - slit1Center) ** 2) / (2 * spreadWidth ** 2));
		const gauss2 = Math.exp(-((y - slit2Center) ** 2) / (2 * spreadWidth ** 2));

		// Sum of two separate peaks (classical behavior)
		return (gauss1 + gauss2) * 0.5;
	}

	// Without measurement: INTERFERENCE pattern with multiple bands
	const interference = calculateInterferencePattern(y, slitSpacing, wavelength, distance);
	const envelope = calculateDiffractionEnvelope(y, slitWidth, wavelength, distance);

	return interference * envelope;
}

/**
 * Get wavelength for different particle types (in arbitrary units)
 * Larger wavelengths = wider interference fringes
 */
export function getWavelength(particleType: 'electron' | 'photon' | 'buckyball'): number {
	// de Broglie wavelength λ = h/p
	// Made more extreme for visual distinction
	switch (particleType) {
		case 'photon':
			return 1.2; // Large wavelength = wide fringes
		case 'electron':
			return 0.6; // Medium
		case 'buckyball':
			return 0.2; // Small wavelength = tight fringes
	}
}

/**
 * Sample a y-position from the probability distribution
 * Uses rejection sampling
 */
export function samplePosition(
	slitWidth: number,
	slitSpacing: number,
	wavelength: number,
	distance: number,
	detectorOn: boolean,
	maxY: number = 8
): number {
	if (detectorOn) {
		// CLASSICAL: Randomly pick one of the two slits
		const whichSlit = Math.random() < 0.5 ? 1 : -1;
		const slitCenter = (slitSpacing / 2) * whichSlit;

		// Small gaussian spread around the chosen slit
		const spreadWidth = slitWidth * 0.8;
		const offset = randomGaussian() * spreadWidth;

		return slitCenter + offset;
	}

	// QUANTUM: Sample from interference pattern using rejection sampling
	const maxAttempts = 1000;

	for (let i = 0; i < maxAttempts; i++) {
		const y = (Math.random() - 0.5) * 2 * maxY;
		const prob = getDoubleSilTProbability(y, slitWidth, slitSpacing, wavelength, distance, false);

		if (Math.random() < prob) {
			return y;
		}
	}

	// Fallback: return a random position near center
	return (Math.random() - 0.5) * slitSpacing * 2;
}

/**
 * Generate a random number from a Gaussian distribution
 * Using Box-Muller transform
 */
function randomGaussian(): number {
	const u1 = Math.random();
	const u2 = Math.random();
	return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
