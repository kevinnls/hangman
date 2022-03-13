<script lang="ts">
	import { RoundState } from '../stores/RoundState';
	import UserInputForm from './UserInputForm.svelte';
	const roundState = RoundState.Instance();
	let isInputDisabled = false;
	let inputPlaceholderText = 'Enter a character';
	let nextButtonText = 'NEXT';
	function handleNextButtonClick() {
		const state = RoundState.getCurrent().state;
		switch (state) {
			case 'progress': //they gave up
				break;
			case 'win':
				break;
			case 'loss':
				break;
		}
	}
	roundState.subscribe((_) => {
		switch (_.state) {
			case 'win':
				isInputDisabled = true;
				inputPlaceholderText = String.fromCodePoint(0x1f38a);
				break;
			case 'loss':
				isInputDisabled = true;
				inputPlaceholderText = `No chances left ${String.fromCodePoint(0x1f61e)}`;
				break;
			case 'progress':
				isInputDisabled = false;
				inputPlaceholderText = 'Enter a character';
				nextButtonText = 'GIVE UP';
				break;
		}
	});
</script>

<section>
	<button on:click={() => roundState.reset()}>RESET</button>
	<UserInputForm disabled={isInputDisabled} placeholder={inputPlaceholderText} />
	<button on:click={handleNextButtonClick}>{nextButtonText}</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: clamp(50%, 600px, 80%);
		margin: auto;
	}
</style>
