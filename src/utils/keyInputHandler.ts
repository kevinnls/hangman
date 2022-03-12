import { RoundState } from '../stores/RoundState';
import { GameState } from '../stores/GameState';

export function keyInputHandler(e: KeyboardEvent): void {
	const current = RoundState.getCurrent();
	const roundState = RoundState.Instance();

	if (current.lostLifeCount === GameState.getCurrent().maxLives) return;
	if (checkInvalidKeys(e)) return;

	const guessedLetter = e.key;

	const isCorrect = current.word.search(guessedLetter) !== -1;
	roundState.registerKeyPress(guessedLetter, isCorrect);

	function checkInvalidKeys(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return true;
		if (!/^[a-zA-Z]{1}$/.test(e.key)) return true;
		if (current.guessedLetters.includes(e.key)) return true;

		return false;
	}
}
