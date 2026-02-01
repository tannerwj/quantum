<script lang="ts">
	import { page } from '$app/stores';

	let mobileMenuOpen = false;
</script>

<nav class="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="text-2xl font-bold bg-gradient-to-r from-quantum-cyan to-quantum-magenta bg-clip-text text-transparent">
				Quantum
			</a>

			<!-- Desktop menu -->
			<div class="hidden md:flex space-x-8">
				<a href="/" class="hover:text-quantum-cyan transition-colors {$page.url.pathname === '/' ? 'text-quantum-cyan' : ''}">
					Home
				</a>
				<a href="/learn" class="hover:text-quantum-cyan transition-colors {$page.url.pathname.startsWith('/learn') ? 'text-quantum-cyan' : ''}">
					Learn
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				class="md:hidden p-2"
				on:click={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-4 space-y-2">
				<a href="/" class="block py-2 hover:text-quantum-cyan transition-colors {$page.url.pathname === '/' ? 'text-quantum-cyan' : ''}">
					Home
				</a>
				<a href="/learn" class="block py-2 hover:text-quantum-cyan transition-colors {$page.url.pathname.startsWith('/learn') ? 'text-quantum-cyan' : ''}">
					Learn
				</a>
			</div>
		{/if}
	</div>
</nav>
