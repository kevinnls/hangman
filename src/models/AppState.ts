interface AppState {
	maxLives: number;
	score: {
		rounds: number;
		wins: number;
	};
	current: CurrentRoundState;
	state: 'playing' | 'paused' | 'ended';
}

interface CurrentRoundState {
	state: 'win' | 'loss' | 'progress';
	lostLifeCount: number;
	word: string;
	guessedLetters: {
		all: string[];
		correct: string[];
	};
}

const defaultState: AppState = {
	state: 'playing',
	maxLives: 6,
	score: {
		rounds: 0,
		wins: 0
	},
	current: {
		state: 'progress',
		lostLifeCount: 0,
		word: 'hello',
		guessedLetters: {
			all: [],
			correct: []
		}
	}
};

export { type CurrentRoundState as CurrentWordState, type AppState, defaultState };
