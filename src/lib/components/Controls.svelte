<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let particleType: 'electron' | 'photon' | 'buckyball';
	export let detectorOn: boolean;
	export let particleRate: number;
	export let isRunning: boolean;
	export let showWaves: boolean = false;
	export let showExpectedPattern: boolean = false;
	export let showHistogram: boolean = false;
	export let isFastForwarding: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div class="mt-6 p-6 bg-gray-900 rounded-lg border border-gray-800">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Particle Rate -->
		<div>
			<label for="particle-rate" class="block text-sm font-medium mb-2">
				Particle Rate: <span class="text-quantum-cyan">{particleRate}/s</span>
			</label>
			<input
				id="particle-rate"
				type="range"
				min="1"
				max="50"
				step="1"
				bind:value={particleRate}
				class="w-full accent-quantum-cyan"
			/>
			<p class="text-xs text-gray-500 mt-1">Set to 1/s to watch individual particles</p>
		</div>

		<!-- Particle Type -->
		<div>
			<label for="particle-type" class="block text-sm font-medium mb-2">Particle Type</label>
			<select
				id="particle-type"
				bind:value={particleType}
				class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
			>
				<option value="photon">Photon (wide fringes)</option>
				<option value="electron">Electron (medium)</option>
				<option value="buckyball">Buckyball (tight fringes)</option>
			</select>
			<p class="text-xs text-gray-500 mt-1">Different wavelengths → different patterns</p>
		</div>

		<!-- Detector -->
		<div class="flex flex-col justify-center">
			<label class="flex items-center space-x-3 cursor-pointer">
				<input
					type="checkbox"
					bind:checked={detectorOn}
					class="w-6 h-6 accent-quantum-cyan"
				/>
				<span class="font-medium">
					<span class={detectorOn ? 'text-orange-400 text-lg' : 'text-cyan-400 text-lg'}>
						Detector {detectorOn ? 'ON' : 'OFF'}
					</span>
					<span class="block text-xs text-gray-400 mt-1">
						{detectorOn ? '→ 2 bands (classical)' : '→ Many bands (quantum)'}
					</span>
				</span>
			</label>
		</div>
	</div>

	<!-- Visualization Toggles -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
		<label class="flex items-center space-x-3 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={showWaves}
				class="w-5 h-5 accent-quantum-cyan"
			/>
			<span class="text-sm">
				<span class="font-medium">Show Waves</span>
				<span class="block text-xs text-gray-400">Wave rings from slits</span>
			</span>
		</label>

		<label class="flex items-center space-x-3 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={showExpectedPattern}
				class="w-5 h-5 accent-quantum-cyan"
			/>
			<span class="text-sm">
				<span class="font-medium">Show Expected Pattern</span>
				<span class="block text-xs text-gray-400">Probability curve</span>
			</span>
		</label>

		<label class="flex items-center space-x-3 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={showHistogram}
				class="w-5 h-5 accent-quantum-cyan"
			/>
			<span class="text-sm">
				<span class="font-medium">Show Histogram</span>
				<span class="block text-xs text-gray-400">Hit distribution</span>
			</span>
		</label>
	</div>

	<!-- Control Buttons -->
	<div class="flex gap-3 mt-6">
		<button
			on:click={() => dispatch('start')}
			class="flex-1 px-6 py-3 bg-quantum-cyan text-black font-semibold rounded-md hover:bg-quantum-cyan/80 transition-colors text-lg"
		>
			{isRunning ? 'Pause' : 'Start'}
		</button>
		<button
			on:click={() => dispatch('fastforward')}
			disabled={isFastForwarding}
			class="px-6 py-3 font-semibold rounded-md transition-colors {isFastForwarding
				? 'bg-yellow-600 text-black animate-pulse'
				: 'bg-yellow-500 text-black hover:bg-yellow-400'}"
		>
			{isFastForwarding ? 'Fast Forwarding...' : 'Fast Forward'}
		</button>
		<button
			on:click={() => dispatch('reset')}
			class="px-6 py-3 bg-gray-700 font-semibold rounded-md hover:bg-gray-600 transition-colors"
		>
			Reset
		</button>
	</div>
</div>
