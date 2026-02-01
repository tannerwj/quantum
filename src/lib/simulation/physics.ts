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

	// Phase difference
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

	if (y === 0) return 1;

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
		// With measurement: no interference, just sum of two single slits
		const envelope = calculateDiffractionEnvelope(y, slitWidth, wavelength, distance);
		return envelope * 0.5; // Reduced amplitude since we're measuring
	}

	// Without measurement: interference pattern modulated by diffraction envelope
	const interference = calculateInterferencePattern(y, slitSpacing, wavelength, distance);
	const envelope = calculateDiffractionEnvelope(y, slitWidth, wavelength, distance);

	return interference * envelope;
}

/**
 * Get wavelength for different particle types (in arbitrary units)
 */
export function getWavelength(particleType: 'electron' | 'photon' | 'buckyball'): number {
	// de Broglie wavelength λ = h/p
	// Relative wavelengths (arbitrary units for visualization)
	switch (particleType) {
		case 'photon':
			return 0.5;
		case 'electron':
			return 0.3;
		case 'buckyball':
			return 0.05; // Much smaller due to higher mass
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
	maxY: number = 7
): number {
	const maxAttempts = 1000;

	for (let i = 0; i < maxAttempts; i++) {
		const y = (Math.random() - 0.5) * 2 * maxY;
		const prob = getDoubleSilTProbability(y, slitWidth, slitSpacing, wavelength, distance, detectorOn);

		if (Math.random() < prob) {
			return y;
		}
	}

	// Fallback: return a random position near center
	return (Math.random() - 0.5) * slitSpacing * 2;
}
