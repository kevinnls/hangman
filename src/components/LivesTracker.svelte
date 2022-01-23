<script lang="ts">
	import Life from '../components/Life.svelte';
	export let lostLivesCount: number; // 0;
	export let maxLives = 6;
	let lives = [...new Array(maxLives)].map(() => true);
	$: lives = lives.map((_, index) => index < maxLives - lostLivesCount);
</script>

<section style="--maxlives: {maxLives}">
	<!--<p>{remainingLives}/{maxLives}</p>-->
	{#each lives as isValid (Math.random())}
		<Life {isValid} />
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
</style>
