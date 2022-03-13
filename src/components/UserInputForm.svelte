<script lang="ts">
	import { RoundState } from '../stores/RoundState';
	export let disabled = false;
	export let placeholder = 'Enter a character';
	let form;
	function handleSubmit(e: SubmitEvent) {
		console.log('the form was submitted...?');
		RoundState.Instance().registerKeyPress(e.target[0].value);
		form.reset();
	}
</script>

<form bind:this={form} name="input" on:submit|preventDefault={handleSubmit}>
	<label>
		<input
			{disabled}
			{placeholder}
			id="character"
			autocomplete="off"
			autocapitalize="characters"
			maxlength="1"
			type="text"
		/>
	</label>
</form>

<style>
	input {
		text-align: center;
	}
</style>
