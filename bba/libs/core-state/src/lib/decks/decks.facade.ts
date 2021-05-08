import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DecksActions from './decks.actions';
import * as DecksFeature from './decks.reducer';
import * as DecksSelectors from './decks.selectors';
import { Deck } from '@bba/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

let mockDecks: Deck[] = [
  {
    id: '21789f40-b0fb-4aa6-8e88-376b4edfd6ba',
    format: 'Modern',
    title: 'Mono Red Burn',
  },
  {
    id: '21569f40-b3fb-as34-8e88-378b4edfd87a',
    format: 'Standard',
    title: 'Gruul Midrange',
  },
  {
    id: '23c68940-b5fb-788d-8e88-376b56dfd687',
    format: 'Pioneer',
    title: 'Blue Skies',
  },
];

@Injectable()
export class DecksFacade {
  private decksSubject: BehaviorSubject<Deck[]> = new BehaviorSubject(
    mockDecks
  );
  currentDecks$ = this.decksSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DecksSelectors.getDecksLoaded));
  allDecks$ = this.store.pipe(select(DecksSelectors.getAllDecks));
  selectedDecks$ = this.store.pipe(select(DecksSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DecksActions.init());
  }

  createDeck(deck: Deck) {
    const decks: Deck[] = this.decksSubject.value;
    const newDeck = Object.assign({}, deck, { id: uuidv4() });
    const updatedDecks: Deck[] = [...decks, newDeck];
    this.update(updatedDecks);
  }

  // TODO: This needs work
  updateDeck(deck: Deck) {
    const decks: Deck[] = this.decksSubject.value;
    const updatedDecks: Deck[] = decks.map((x) => {
      if (x.id === deck.id) x = deck;
      return x;
    });
    decks.concat(updatedDecks);
    this.update(updatedDecks);
  }

  deleteDeck(deck: Deck) {
    const decks: Deck[] = this.decksSubject.value;
    const updatedDecks: Deck[] = decks.filter((d) => d.id !== deck.id);
    this.update(updatedDecks);
  }

  update(deck: Deck[]) {
    this.decksSubject.next(deck);
  }
}
