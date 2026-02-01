<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let slitWidth: number;
	export let slitSpacing: number;
	export let particleType: 'electron' | 'photon' | 'buckyball';
	export let detectorOn: boolean;
	export let particleRate: number;
	export let isRunning: boolean;

	const dispatch = createEventDispatcher();
</script>

<div class="mt-6 p-6 bg-gray-900 rounded-lg border border-gray-800">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Slit Width -->
		<div>
			<label class="block text-sm font-medium mb-2">
				Slit Width: <span class="text-quantum-cyan">{slitWidth.toFixed(2)}</span>
			</label>
			<input
				type="range"
				min="0.1"
				max="2.0"
				step="0.1"
				bind:value={slitWidth}
				class="w-full accent-quantum-cyan"
			/>
		</div>

		<!-- Slit Spacing -->
		<div>
			<label class="block text-sm font-medium mb-2">
				Slit Spacing: <span class="text-quantum-cyan">{slitSpacing.toFixed(2)}</span>
			</label>
			<input
				type="range"
				min="1.0"
				max="5.0"
				step="0.1"
				bind:value={slitSpacing}
				class="w-full accent-quantum-cyan"
			/>
		</div>

		<!-- Particle Rate -->
		<div>
			<label class="block text-sm font-medium mb-2">
				Particle Rate: <span class="text-quantum-cyan">{particleRate}</span>
			</label>
			<input
				type="range"
				min="1"
				max="50"
				step="1"
				bind:value={particleRate}
				class="w-full accent-quantum-cyan"
			/>
		</div>

		<!-- Particle Type -->
		<div>
			<label class="block text-sm font-medium mb-2">Particle Type</label>
			<select
				bind:value={particleType}
				class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
			>
				<option value="electron">Electron</option>
				<option value="photon">Photon</option>
				<option value="buckyball">Buckyball</option>
			</select>
		</div>

		<!-- Detector -->
		<div class="flex items-center">
			<label class="flex items-center space-x-3 cursor-pointer">
				<input
					type="checkbox"
					bind:checked={detectorOn}
					class="w-5 h-5 accent-quantum-cyan"
				/>
				<span class="font-medium">
					Detector {detectorOn ? 'ON' : 'OFF'}
					<span class="block text-xs text-gray-400">
						{detectorOn ? 'Measuring which-path' : 'No measurement'}
					</span>
				</span>
			</label>
		</div>

		<!-- Control Buttons -->
		<div class="flex gap-3">
			<button
				on:click={() => dispatch('start')}
				class="flex-1 px-4 py-2 bg-quantum-cyan text-black font-semibold rounded-md hover:bg-quantum-cyan/80 transition-colors"
			>
				{isRunning ? 'Pause' : 'Start'}
			</button>
			<button
				on:click={() => dispatch('reset')}
				class="px-4 py-2 bg-gray-700 font-semibold rounded-md hover:bg-gray-600 transition-colors"
			>
				Reset
			</button>
		</div>
	</div>
</div>
