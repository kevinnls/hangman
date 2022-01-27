import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { type AppState, defaultState } from '../models/AppState';

function createAppState() {
	const initialState: AppState =
		(browser && (JSON.parse(window.localStorage.getItem('appstate')) ?? defaultState)) ||
		defaultState;

	const { subscribe, update, set } = writable(initialState);

	const _appState = {
		subscribe,
		updateCurrent: (_newValues: object) =>
			update((currentState) => {
				return { ...currentState, current: {...currentState.current, ..._newValues} };
			}),
		reset: (newWord) => {
				_appState.updateCurrent({
					lostLifeCount: 0,
					word: newWord,
					guessedLetters: {
						all: [],
						correct: []
					}
				})
			}
		},
		setWord: (word: string) => {
		}
	};
	return appState;
}

export const appState = createAppState();
