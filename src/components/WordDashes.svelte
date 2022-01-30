<script>
	export let dashes = 'word';
</script>

<section>
	{#each dashes as letter, index (index)}
		<span>{letter.toUpperCase() ?? '_'}</span>
	{/each}
</section>

<style>
	section {
		margin: 1em auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: clamp(50%, 600px, 80%);
		font-size: xx-large;
	}
	span {
		box-sizing: border-box;
		padding: clamp(3px, 0.8ch, 1ch);
	}
</style>
