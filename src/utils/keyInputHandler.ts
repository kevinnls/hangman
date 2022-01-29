import type { CurrentWordState } from 'src/models/AppState';
import { appState } from '../stores/appState';

export const keyInputHandler = (e: KeyboardEvent) => {
	let current: CurrentWordState;
	appState.subscribe((updatedState) => (current = updatedState.current));

	if (checkInvalidKeys(e)) return;

	const guessedLetter = e.key;

	let isCorrect = current.word.search(guessedLetter) !== -1;
	appState.registerKeyPress(guessedLetter, isCorrect);

	function checkInvalidKeys(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return true;
		if (!/^[a-zA-Z]{1}$/.test(e.key)) return true;
		if (current.guessedLetters.all.includes(e.key)) return true;

		return false;
	}
};
