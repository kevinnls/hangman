<script>
	export let word;
	export let guessedLetters;
	$: regex = new RegExp(`[^${guessedLetters.join('')}]`, 'ig');
	$: _word = word.replaceAll(regex, '_');
</script>

<section>
	{#each _word as letter (Math.random())}
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
