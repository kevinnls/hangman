<script lang="ts">
	import { browser } from '$app/env';

	import ClueGrid from '../components/ClueGrid.svelte';
	import LivesTracker from '../components/LivesTracker.svelte';
	import WordDashes from '../components/WordDashes.svelte';

	if (browser) window.addEventListener('keypress', handleKeyPress);

	export let db;
	let deck = db?.deck;

	let lostLivesCount;
	let foundLettersCount;

	let randomIndex: number = Math.floor(Math.random() * deck.length);
	let currentWord = deck[randomIndex].word.toLowerCase();
	let guessedLetters = [];

	reset();

	$: isLoss = lostLivesCount === 6;
	$: isWin = foundLettersCount === new Set(currentWord).size;
	$: if (isWin) {
		//if (browser) alert('win!');
		reset();
	}
	$: if (isLoss) {
		//if (browser) alert('loss!');
		reset();
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (invalidKey(e)) return;
		const guessedLetter = e.key;
		guessedLetters = [guessedLetter, ...guessedLetters];
		if (currentWord.search(guessedLetter) !== -1) foundLettersCount++;
		else lostLivesCount++;

		function invalidKey(e: KeyboardEvent) {
			if (e.altKey || e.ctrlKey || e.metaKey) return true;
			if (!isNaN(Number(e.key))) return true;
			if (e.key.search(/\W/gi) !== -1) return true;
			if (guessedLetters.includes(e.key)) return true;

			return false;
		}
	}
	function reset() {
		guessedLetters = [];
		lostLivesCount = 0;
		foundLettersCount = 0;
	}
</script>

<ClueGrid />
<LivesTracker bind:lostLivesCount maxLives={6} />
<WordDashes word={currentWord} bind:guessedLetters />
