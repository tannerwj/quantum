<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<NavBar />
	<main class="flex-1">
		<slot />
	</main>
	<footer class="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
		<p>Quantum Physics Visualization • Built with SvelteKit & Three.js</p>
	</footer>
</div>
