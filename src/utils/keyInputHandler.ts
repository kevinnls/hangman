import { RoundState } from '../stores/RoundState';

export function keyInputHandler(e: KeyboardEvent) {
	let current;
	const roundState = RoundState.Instance();
	roundState.subscribe((updatedState) => (current = updatedState))();

	if (checkInvalidKeys(e)) return;

	const guessedLetter = e.key;

	let isCorrect = current.word.search(guessedLetter) !== -1;
	roundState.registerKeyPress(guessedLetter, isCorrect);

	function checkInvalidKeys(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return true;
		if (!/^[a-zA-Z]{1}$/.test(e.key)) return true;
		if (current.guessedLetters.includes(e.key)) return true;

		return false;
	}
}
