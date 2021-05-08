import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DecksActions from './decks.actions';
import * as DecksFeature from './decks.reducer';
import * as DecksSelectors from './decks.selectors';
import { Deck, Card } from '@bba/api-interfaces';
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
  private mockDecksSubject: BehaviorSubject<Deck[]> = new BehaviorSubject(
    mockDecks
  );
  currentMockDecks$ = this.mockDecksSubject.asObservable();
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
    const newDeck = Object.assign({}, deck, { id: uuidv4() });
    let updatedDecks: Deck[];
    this.currentMockDecks$.subscribe((x) =>
      x.forEach((deck) => updatedDecks.push(deck))
    );
    updatedDecks.push(newDeck);
    this.mockDecksSubject.next(updatedDecks);
  }

  updateDeck(deck: Deck) {
    let updatedDecks: Deck[];
    this.currentMockDecks$.subscribe((x) =>
      x.forEach((deck) => updatedDecks.push(deck))
    );
    updatedDecks.push(deck);
    this.mockDecksSubject.next(updatedDecks);
  }

  deleteDeck(deck: Deck) {
    let updatedDecks: Deck[];
    this.currentMockDecks$.subscribe(
      (x) => (updatedDecks = x.filter((d) => d.id !== deck.id))
    );
    this.mockDecksSubject.next(updatedDecks);
  }
}
