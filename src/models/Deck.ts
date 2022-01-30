class Deck {
	cards: Card[];
	current: Card | EndCard;
	private currentIndex: number;
	private shuffled: boolean;
	// TODO: `cards` needs to be validated and have a type
	constructor(cards: any, ordered = true) {
		this.cards = { ...cards };
		if (!ordered) this.shuffle();
		this.current = this.cards[0];
		this.currentIndex = 0;
	}
	shuffle(): void {
		let m = this.cards.length;
		while (m > 0) {
			const i = Math.floor(Math.random() * m--);
			const t = this.cards[m];
			this.cards[m] = this.cards[i];
			this.cards[i] = t;
		}
		this.shuffled = true;
	}
	next(): void {
		console.log(this.cards);
		if (this.currentIndex + 1 < this.cards.length) {
			this.current = this.cards[++this.currentIndex] || new EndCard();
		}
	}
}
class Card {
	private _word: string;
	clues: Clue[];
	get word() {
		return this._word.toLowerCase();
	}
}
class EndCard extends Card {}
class Clue {
	clueType: 'image' | 'text' | 'url';
	clue: string;
}
export { Deck };
