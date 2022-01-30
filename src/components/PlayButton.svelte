<script lang="ts">
	import type { Deck } from '../models/Deck';
	export let state;
	export let deck: Deck;
	$: text = state === 'progress' ? 'SKIP' : 'NEXT';
</script>

<button on:click={deck.next}>
	{text}
</button>
