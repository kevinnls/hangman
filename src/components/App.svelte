<script lang="ts">
	import { GameState } from '../stores/GameState';
	const gameState = GameState.Instance();
	import { RoundState } from '../stores/RoundState';
	const roundState = RoundState.Instance();
	import ClueGrid from '../components/ClueGrid.svelte';
	import LivesTracker from '../components/LivesTracker.svelte';
	import WordDashes from '../components/WordDashes.svelte';
	import Controls from '../components/Controls.svelte';
</script>

<ClueGrid />
<LivesTracker lostLivesCount={$roundState.lostLifeCount} maxLives={$gameState.maxLives} />
<WordDashes dashes={$roundState.dashes} />

<Controls />
