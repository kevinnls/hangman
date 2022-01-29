<script lang="ts">
	import Footer from '../components/Footer.svelte';
	import App from '../components/App.svelte';
	import * as sampleDb from '../const/sampleDb.json';
	import { Deck } from '../models/Deck';
</script>

<header>
	<h1>Hangman</h1>
</header>

<main>
	<App deck={new Deck(sampleDb.deck)} maxLives={sampleDb.meta.maxLives} />
</main>

<Footer />
