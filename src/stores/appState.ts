import { browser } from '$app/env';
import { type Subscriber, type Unsubscriber, type Updater, writable } from 'svelte/store';
import { type AppState, defaultState } from '../models/AppState';

class AppStateManager {
	constructor(defaults = defaultState) {
		const initialState: AppState =
			(browser && (JSON.parse(window.localStorage.getItem('appstate')) ?? defaults)) || defaults;

		const { subscribe, update, set } = writable(initialState);
		this.subscribe = subscribe;
		this.update = update;
		this.defaults = defaults;
	}

	subscribe: (Subscriber, Invalidator?) => Unsubscriber;
	update: (Updater) => void;
	defaults;
	registerKeyPress(key, correct: boolean = false) {
		this.update((currentState) => {
			let newState = { ...currentState };
			newState.current.guessedLetters.all.push(key);
			if (correct) newState.current.guessedLetters.correct.push(key);
			if (!correct) ++newState.current.lostLifeCount;
			return newState;
		});
		this.subscribe((state) => {
			if (state.current.guessedLetters.correct.length === new Set(state.current.word).size) {
				console.log('yay');
				this.registerResult('w', 'oops');
			}
		});
	}
	updateCurrent(_newValues: object) {
		this.update((currentState) => {
			return { ...currentState, current: { ...currentState.current, ..._newValues } };
		});
	}
	reset(newWord) {
		console.log('resetting');
		this.update((currentState) => {
			let newState = { ...currentState };
			newState.current = { ...this.defaults.current, word: newWord };
			return newState;
		});
	}
	registerResult(result: 'w' | 'l', newWord) {
		this.update((currentState) => {
			let newState = { ...currentState };
			if (result === 'w') ++newState.score.wins;
			newState.score.rounds++;
			console.log(this.defaults.current)
			newState.current = { ...this.defaults.current };
			newState.current.word = newWord;
			console.log(newState)
			return newState;
		});
	}
}

export const appState = new AppStateManager();
