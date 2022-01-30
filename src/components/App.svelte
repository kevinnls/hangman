<script lang="ts">
	import { browser } from '$app/env';
	import ClueGrid from '../components/ClueGrid.svelte';
	import LivesTracker from '../components/LivesTracker.svelte';
	import WordDashes from '../components/WordDashes.svelte';
	import PlayButton from '../components/PlayButton.svelte';

	import { appState } from '../stores/appState';
	import { keyInputHandler } from '../utils/keyInputHandler';
import type { Deck } from 'src/models/Deck';

	if (browser) window.addEventListener('keypress', keyInputHandler);

	export let deck:Deck;
	export let maxLives:number;
	$: console.log(appState.state);
</script>

<ClueGrid />
<LivesTracker
	lostLivesCount={$appState.current.lostLifeCount}
	maxLives={$appState.maxLives || maxLives}
/>
<WordDashes
	word={$appState.current.word}
	guessedLetters={$appState.current.guessedLetters.correct}
/>
<PlayButton deck={deck} state={$appState.current.state} />
