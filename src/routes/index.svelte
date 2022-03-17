<script lang="ts">
	import Footer from '../components/Footer.svelte';
	import App from '../components/App.svelte';
	import * as sampleDb from '../const/sampleDb.json';
</script>

<svelte:head>
	<title>Hangman | kevinnlsamuel.com</title>
</svelte:head>

<header>
	<h1>Hangman</h1>
</header>

<main>
	<App db={sampleDb} />
</main>

<Footer />
