<script lang="ts">
	import { browser } from '$app/env';
	import ClueGrid from '../components/ClueGrid.svelte';
	import LivesTracker from '../components/LivesTracker.svelte';
	import WordDashes from '../components/WordDashes.svelte';

	import { appState } from '../stores/appState';
	import { keyInputHandler } from '../utils/keyInputHandler';

	if (browser) window.addEventListener('keypress', keyInputHandler);

	export let deck
	export let maxLives

	$: isLoss = $appState.current.lostLifeCount === 6;
	$: isWin =
		$appState.current.guessedLetters.correct.length === new Set($appState.current.word).size;
	$: console.log(isWin);
	$: if (isWin) {
		//if (browser) alert('win!');
		appState.registerResult('w', deck.next().word)
	}
	$: if (isLoss) {
		//if (browser) alert('loss!');
		appState.registerResult('l', deck.next().word)
	}

</script>

<ClueGrid />
<LivesTracker
	lostLivesCount={$appState.current.lostLifeCount}
	maxLives={$appState.maxLives || maxLives}
/>
<WordDashes word={$appState.current.word} guessedLetters={$appState.current.guessedLetters.correct} />
