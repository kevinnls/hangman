<script lang="ts">
	import ClueGrid from '../components/ClueGrid.svelte';
	export let db;
	let deck = db?.deck;

	let randomIndex: number = Math.floor(Math.random() * deck.length);
	let currentWord = deck[randomIndex].word.toLowerCase();
	let guessedLetters = [];

	$: regex = new RegExp(`[^${guessedLetters.join('')}]`, 'ig');
	$: wordInProgress = currentWord.replaceAll(regex, '_');

	let lostLivesCount = 0;
</script>

<ClueGrid />
