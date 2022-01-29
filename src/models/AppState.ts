interface AppState {
	maxLives: number,
	score: {
		rounds: number;
		wins: number;
	};
	current: CurrentWordState;
}

interface CurrentWordState {
	lostLifeCount: number;
	word: string;
	guessedLetters: {
		all: string[];
		correct: string[];
	};
}

const defaultState: AppState = {
	maxLives: 6,
	score: {
		rounds: 0,
		wins: 0
	},
	current: {
		lostLifeCount: 0,
		word: 'hello',
		guessedLetters: {
			all: [],
			correct: []
		}
	}
};

export { type CurrentWordState, type AppState, defaultState };
