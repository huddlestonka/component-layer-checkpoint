import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Deck } from '@bba/api-interfaces';
import { DecksFacade } from '@bba/core-state';

@Component({
  selector: 'bba-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  providers: [DecksFacade],
})
export class DecksComponent implements OnInit, OnDestroy {
  decks: Deck[];
  sub: Subscription;

  constructor(private decksFacade: DecksFacade) {}

  ngOnInit(): void {
    this.sub = this.decksFacade.currentDecks$.subscribe(
      (x) => (this.decks = x)
    );
  }

  saveDeck(deck: Deck) {
    if (deck.id) {
      this.decksFacade.updateDeck(deck);
    } else {
      this.decksFacade.createDeck(deck);
    }
  }

  deleteDeck(deck: Deck) {
    this.decksFacade.deleteDeck(deck);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
