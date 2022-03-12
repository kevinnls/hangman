import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { defaultRoundState, type RoundStateModel } from '../models/RoundState';
class RoundState {
	private static _instance: RoundState;
	public static Instance(args: Partial<RoundStateModel> = defaultRoundState): RoundState {
		return this._instance || (this._instance = new this(args));
	}
	public static getCurrent(): RoundStateModel {
		let currentState;
		RoundState.Instance().subscribe((_currentState) => (currentState = _currentState))();
		return currentState;
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
		initialState.dashes = this.calculateDashes(initialState.word, initialState.correctLetters);
		({ subscribe: this.subscribe, update: this.update, set: this.set } = writable(initialState));
		this.subscribe((currentState) => {
			//write all changes to game state to localStorage
			if (browser) localStorage.setItem('roundstate', JSON.stringify(currentState));
		});
	}
	public registerKeyPress(key: string, isCorrect: boolean): void {
		this.update((_) => {
			const newState = { ..._ };
			newState.guessedLetters.push(key);
			if (isCorrect) {
				newState.correctLetters.push(key);
				newState.dashes = this.calculateDashes(newState.word, newState.correctLetters);
			} else {
				// calculate lostLifeCount
				newState.lostLifeCount = newState.guessedLetters.length - newState.correctLetters.length;
			}
			return newState;
		});
	}
	public reset(): void {
		this.update((_: RoundStateModel) => {
			return { ...defaultRoundState, word: _.word, dashes: this.calculateDashes(_.word) };
		});
	}
	public setWord(word: string): void {
		this.update(() => {
			return { ...defaultRoundState, word: word };
		});
	}
	public subscribe;
	private update;
	private set;
	//private _dashes: string;
	private calculateDashes(word: string, correctLetters: string[] = []): string {
		if (correctLetters?.length > 0) {
			const regex = new RegExp(`[^${correctLetters.join('')}]`, 'ig');
			return word.replaceAll(regex, '_');
		} else return '_'.repeat(word.length);
	}
}

export { RoundState };
