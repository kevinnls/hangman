interface GameStateModel {
	maxLives: number;
	roundCount: number;
	winCount: number;
	state: 'playing' | 'paused' | 'ended';
}
const defaultGameState: GameStateModel = {
	state: 'paused',
	maxLives: 6,
	roundCount: 0,
	winCount: 0
};

export { type GameStateModel, defaultGameState };
