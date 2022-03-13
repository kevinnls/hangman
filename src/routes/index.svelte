<script lang="ts">
	import { browser } from '$app/env';
	import Footer from '../components/Footer.svelte';
	import App from '../components/App.svelte';
	import * as sampleDb from '../const/sampleDb.json';
	import { Deck } from '../models/Deck';
	import { GameState } from '../stores/GameState';
	import { RoundState } from '../stores/RoundState';

	const deck = new Deck(sampleDb.deck, sampleDb.meta.ordered); //or get from localStorage
	const roundState = RoundState.Instance({
		word: deck.current.word,
		maxLifeCount: sampleDb.meta.maxLives
	});
	const gameState = GameState.Instance({ maxLives: sampleDb.meta.maxLives });
	function changeToNextWord(){
		console.log("YESSSS")
	}
</script>

<header>
	<h1>Hangman</h1>
</header>

<main>
	<App on:nextword={changeToNextWord} />
</main>

<Footer />
