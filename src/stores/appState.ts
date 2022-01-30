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
		this.set = set;
		this.defaults = defaults;
		this.state = 'paused';
		console.log(defaults);
	}

	subscribe: (Subscriber, Invalidator?) => Unsubscriber;
	update: (Updater) => void;
	state: 'playing' | 'win' | 'loss' | 'paused';
	set;
	defaults;
	registerKeyPress(key, correct: boolean = false) {
		this.update((currentState) => {
			let newState = { ...currentState };
			newState.current.guessedLetters.all.push(key);
			if (correct) newState.current.guessedLetters.correct.push(key);
			if (!correct) ++newState.current.lostLifeCount;
			[newState.state, newState.current.state] = this.checkResult(newState);
			console.log(this.state);
			return newState;
		});
	}
	checkResult(_state: AppState) {
		let app = 'playing';
		let round = 'progress';
		if (_state.current.guessedLetters.correct.length === new Set(_state.current.word).size)
			round = 'win';
		if (_state.current.lostLifeCount === _state.maxLives) round = 'loss';
		return [app, round]
	}
	updateCurrent(_newValues: object) {
		this.update((currentState) => {
			return { ...currentState, current: { ...currentState.current, ..._newValues } };
		});
	}
	registerResult(result: 'w' | 'l', newWord) {
		this.update((currentState) => {
			let newState = { ...currentState };
			if (result === 'w') ++newState.score.wins;
			newState.score.rounds++;
			newState.current = { ...this.defaults.current };
			newState.current.guessedLetters.all = [];
			newState.current.guessedLetters.correct = [];
			console.log(this.defaults.current);
			newState.current.word = newWord;
			console.log(newState);
			return newState;
		});
	}
}

export const appState = new AppStateManager();
