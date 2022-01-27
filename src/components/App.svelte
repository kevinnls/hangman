<script lang="ts">
	import { browser } from '$app/env';

	import ClueGrid from '../components/ClueGrid.svelte';
	import LivesTracker from '../components/LivesTracker.svelte';
	import WordDashes from '../components/WordDashes.svelte';

	import { appState } from '../stores/appState';
	import { keyInputHandler } from '../utils/keyInputHandler';

	if (browser) window.addEventListener('keypress', keyInputHandler);

	export let db;
	let deck = db?.deck;

	let lostLivesCount = 0;
	let foundLettersCount = 0;

	let randomIndex: number = Math.floor(Math.random() * deck.length);
	let currentWord = deck[randomIndex].word.toLowerCase();
	appState.setWord(currentWord);

	let guessedLetters = [];

	$: isLoss = $appState.current.lostLifeCount === 6;
	$: isWin =
		$appState.current.guessedLetters.correct.length === new Set($appState.current.word).size;
	$: console.log(isWin)
	$: if (isWin) {
		//if (browser) alert('win!');
		reset();
	}
	$: if (isLoss) {
		//if (browser) alert('loss!');
		reset();
	}

	function reset() {
		appState.reset('victory')
		guessedLetters = [];
		lostLivesCount = 0;
		foundLettersCount = 0;
	}
</script>

<ClueGrid />
<LivesTracker
	lostLivesCount={$appState.current.lostLifeCount}
	maxLives={$appState.current.maxLives || db.meta.maxLives}
/>
<WordDashes word={currentWord} guessedLetters={$appState.current.guessedLetters.correct} />
