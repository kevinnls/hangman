<script>
	export let isValid = true;
</script>

<svg
	fill={isValid ? 'pink' : 'black'}
	opacity={isValid ? 1 : 0.3}
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="50" cy="50" r="50" />
</svg>

<style>
	svg {
		width: clamp(10px, 1.5em, 2em);
		margin: 0.5ch;
	}
</style>
