interface RoundStateModel {
	word: string;
	guessedLetters: string[];
	correctLetters: string[];
	lostLifeCount: number;
	maxLifeCount: number;
	state: 'win' | 'loss' | 'progress';
	dashes: string;
}
const defaultRoundState: RoundStateModel = {
	state: 'progress',
	lostLifeCount: 0,
	maxLifeCount: 6,
	correctLetters: [],
	guessedLetters: [],
	word: '',
	dashes: ''
};

export { type RoundStateModel, defaultRoundState };
