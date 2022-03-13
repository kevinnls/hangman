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
		//immediate unsubscription;
		return currentState;
	}
	private constructor(defaultState: Partial<RoundStateModel> = defaultRoundState) {
		this.defaults = structuredClone({ ...defaultRoundState, ...defaultState });
		let initialState = structuredClone(this.defaults);
		if (browser) {
			try {
				const localState = JSON.parse(localStorage.getItem('roundstate'));
				if (localState)
					//TODO: check if it's actually RoundStateModel
					initialState = structuredClone({ ...this.defaults, ...localState });
			} catch (e) {
				if (e.name === 'SyntaxError') {
					console.log('localState was marred; clearing');
					localStorage.setItem('roundstate', JSON.stringify(this.defaults));
				} else throw e;
			}
		}
		initialState.dashes = this.calculateDashes(initialState.word, initialState.correctLetters);
		({
			subscribe: this.subscribe,
			update: this.update,
			set: this.set
		} = writable(structuredClone(initialState)));
		this.unsubscriber = this.subscribe((currentState: RoundStateModel) => {
			//write all changes to game state to localStorage
			if (browser) localStorage.setItem('roundstate', JSON.stringify(currentState));
		});
	}
	public registerKeyPress(character: string): void {
		if (isValidCharacter(character) && isLifeLeft())
			this.update((_) => {
				const newState = { ..._ };
				newState.guessedLetters.push(character);
				if (_.word.search(character) !== -1) {
					newState.correctLetters.push(character);
					newState.dashes = this.calculateDashes(newState.word, newState.correctLetters);
				} else {
					// calculate lostLifeCount
					newState.lostLifeCount = newState.guessedLetters.length - newState.correctLetters.length;
				}
				newState.state = this.checkState(
					newState.word,
					newState.correctLetters,
					newState.lostLifeCount,
					newState.maxLifeCount
				);
				return newState;
			});
		function isLifeLeft(): boolean {
			return RoundState.getCurrent().lostLifeCount < RoundState.getCurrent().maxLifeCount;
		}
		function isValidCharacter(character: string) {
			const validCharactersRegex = /^[a-zA-Z]{1}/;
			if (!validCharactersRegex.test(character)) return false;
			if (RoundState.getCurrent().guessedLetters.includes(character)) return false;
			return true;
		}
	}
	public reset(): void {
		const _ = RoundState.getCurrent().word;
		this.set(structuredClone({ ...this.defaults, word: _, dashes: this.calculateDashes(_) }));
	}
	public setWord(word: string): void {
		this.update(() => {
			return { ...this.defaults, word: word };
		});
	}
	public subscribe;
	private update;
	private set;
	private readonly defaults;
	private unsubscriber;

	private calculateDashes(word: string, correctLetters: string[] = []): string {
		const correctLetterSet = new Set(correctLetters);
		if (correctLetterSet?.size > 0) {
			let dashes = '';
			for (const char of word[Symbol.iterator]()) {
				dashes += correctLetterSet.has(char) ? char : '_';
			}
			return dashes;
		} else return '_'.repeat(word.length);
	}
	private checkState(
		word: string,
		correctLetters: string[],
		lostLifeCount: number,
		maxLifeCount: number
	) {
		if (lostLifeCount >= maxLifeCount) return 'loss';
		if (new Set(word).size === new Set(correctLetters).size) {
			// risky comparing sizes; but only valid is added in the first place
			// refer registerKeyPress()
			return 'win';
		}
		return 'progress';
	}
}

export { RoundState };
