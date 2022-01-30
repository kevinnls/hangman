<script lang="ts">
	import { browser } from '$app/env';
	import Footer from '../components/Footer.svelte';
	import App from '../components/App.svelte';
	import * as sampleDb from '../const/sampleDb.json';
	import { Deck } from '../models/Deck';
	import { GameState } from '../stores/GameState';
	import { RoundState } from '../stores/RoundState';
	import { keyInputHandler } from '../utils/keyInputHandler';

	const deck = new Deck(sampleDb.deck, sampleDb.meta.ordered);
	const roundState = RoundState.Instance({ word: deck.current.word });
	const gameState = GameState.Instance({ maxLives: sampleDb.meta.maxLives });

	if (browser) window.addEventListener('keypress', keyInputHandler);
</script>

<header>
	<h1>Hangman</h1>
</header>

<main>
	<App />
</main>

<Footer />
