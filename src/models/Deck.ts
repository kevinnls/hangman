class Deck {
	cards: Card[];
	current: Card;
	private currentIndex: number;
	private shuffled: boolean;
	constructor(cards, shuffle: boolean = true) {
		this.cards = cards;
		console.log(this.cards);
		if (shuffle) this.shuffle();
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
	next() {
		console.log(this.cards);
		if (this.currentIndex + 1 < this.cards.length) {
			this.current = this.cards[++this.currentIndex] || new EndCard();
		}
	}
}
class Card {
	_word: string;
	clues: Clue[];
	get word() {
		return this._word.toLowerCase();
	}
}
class EndCard extends Card {
	_word = 'ENDOFDECK';
}
class Clue {
	clueType: 'image' | 'text' | 'url';
	clue: string;
}
export { Deck };
