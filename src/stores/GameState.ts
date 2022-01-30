import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { defaultGameState, type GameStateModel } from '../models/GameState';
class GameState {
	private static _instance: GameState;
	public static Instance(args: Partial<GameStateModel> = defaultGameState): GameState {
		return this._instance || (this._instance = new this(args));
	}
	private constructor(defaultState: Partial<GameStateModel> = defaultGameState) {
		let initialState = { ...defaultGameState, ...defaultState };
		let localState = null;
		if (browser) {
			localState = JSON.parse(localStorage.getItem('gamestate'));
			if (localState)
				//TODO: check if it's actually GameStateModel
				initialState = { ...defaultGameState, ...localState };
		}
		({ subscribe: this.subscribe, update: this.update, set: this.set } = writable(initialState));
		this.subscribe((currentState) => {
			//write all changes to game state to localStorage
			if (browser) localStorage.setItem('gamestate', JSON.stringify(currentState));
		});
	}
	subscribe;
	update;
	set;
}

export { GameState };
