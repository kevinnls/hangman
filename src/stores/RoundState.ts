import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { defaultRoundState, type RoundStateModel } from '../models/RoundState';
class RoundState {
	private static _instance: RoundState;
	public static Instance(args: Partial<RoundStateModel> = defaultRoundState): RoundState {
		return this._instance || (this._instance = new this(args));
	}
	private constructor(defaultState: Partial<RoundStateModel> = defaultRoundState) {
		let initialState = { ...defaultRoundState, ...defaultState };
		let localState = null;
		if (browser) {
			localState = JSON.parse(localStorage.getItem('roundstate'));
			if (localState)
				//TODO: check if it's actually RoundStateModel
				initialState = { ...defaultRoundState, ...localState };
		}
		({ subscribe: this.subscribe, update: this.update, set: this.set } = writable(initialState));
		this.subscribe((currentState) => {
			//write all changes to game state to localStorage
			if (browser) localStorage.setItem('roundstate', JSON.stringify(currentState));
		});
	}
	public registerKeyPress(key, isCorrect) {}
	public setWord(word) {
		this.update((_) => {
			return { ..._, word: word };
		});
	}
	subscribe;
	update;
	set;
}

export { RoundState };
