import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { defaultGameState } from 'src/models/GameState';
class GameState {
	constructor(defaultState = defaultGameState) {
		if (browser)
			JSON.parse(localStorage.getItem('gamestate'))(
				({ subscribe: this.subscribe, update: this.update, set: this.set } = writable(defaultState))
			);
	}
	subscribe;
	update;
	set;
}

export { type GameState };
