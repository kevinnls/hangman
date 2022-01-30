import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { defaultGameState } from 'src/models/GameState';
class GameState {
	constructor(defaultState = defaultGameState) {
		let initialState = { ...defaultGameState, ...defaultState };
		let localState = null;
		if (browser) {
			localState = JSON.parse(localStorage.getItem('gamestate'));
			if (localState)
				//TODO: check if it's actually GameStateModel
				initialState = { ...localState };
		}
		({ subscribe: this.subscribe, update: this.update, set: this.set } = writable(defaultState));

		this.subscribe((currentState) => { //write all changes to game state to localStorage
			if (browser) localStorage.setItem('gamestate', currentState);
		});
	}
	subscribe;
	update;
	set;
}

export { type GameState };
