interface RoundStateModel {
	word: string;
	guessedLetters: string[];
	correctLetters: string[];
	lostLifeCount: number;
	state: 'win' | 'loss' | 'progress';
}
const defaultRoundState: RoundStateModel = {
	state: 'progress',
	lostLifeCount: 0,
	correctLetters: [],
	guessedLetters: [],
	word: ''
};

export { type RoundStateModel, defaultRoundState };
