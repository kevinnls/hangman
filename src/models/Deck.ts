class Deck {
	cards: Card[];
	current: Card | EndCard;
	private currentIndex: number;
	private deckHeight: number;
	private shuffled: boolean;
	// TODO: `cards` needs to be validated and have a type
	constructor(cards: any, ordered = true) {
		this.cards = structuredClone({ ...cards });
		if (!ordered) this.shuffle();
		this.current = this.cards[0];
		this.currentIndex = 0;
		this.deckHeight = Object.keys(this.cards).length;
	}
	shuffle(): void {
		let m = this.deckHeight;
		while (m > 0) {
			const i = Math.floor(Math.random() * m--);
			const t = this.cards[m];
			this.cards[m] = this.cards[i];
			this.cards[i] = t;
		}
		this.shuffled = true;
	}
	next(): Card | EndCard {
		if (this.currentIndex < this.deckHeight) {
			this.current = this.cards[++this.currentIndex]
			return this.current;
		} else return new EndCard();
	}
}
class Card {
	public IS_END_CARD: boolean;
	private _word: string;
	clues: Clue[];
	get word() {
		return this._word.toLowerCase();
	}
}
class EndCard extends Card {
	public IS_END_CARD: boolean;
	constructor() {
		super();
		this.IS_END_CARD = true;
	}
}
class Clue {
	clueType: 'image' | 'text' | 'url';
	clue: string;
}
export { Deck };
