import type { CurrentWordState } from 'src/models/AppState';
import { appState } from '../stores/appState';

export const keyInputHandler = (e: KeyboardEvent) => {
	let current: CurrentWordState;
	appState.subscribe((updatedState) => (current = updatedState.current));

	if (checkInvalidKeys(e)) return;

	const guessedLetter = e.key;
	let correctLetters = current.guessedLetters.correct; 
	let lostLifeCount = current.lostLifeCount;

	if (current.word.search(guessedLetter) !== -1)
		correctLetters.push(guessedLetter)
	else lostLifeCount++;

	appState.updateCurrent({
			lostLifeCount,
			guessedLetters: {
				all: [...current.guessedLetters.all, guessedLetter],
				correct: correctLetters,
			}
		
	});

	function checkInvalidKeys(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return true;
		if (!/[a-zA-Z]/.test(e.key)) return true;
		if (current.guessedLetters.all.includes(e.key)) return true;

		return false;
	}
};
