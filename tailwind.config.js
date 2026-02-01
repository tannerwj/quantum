/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				quantum: {
					cyan: '#00d9ff',
					magenta: '#ff00ff',
					purple: '#8b5cf6'
				}
			}
		}
	},
	plugins: []
};
