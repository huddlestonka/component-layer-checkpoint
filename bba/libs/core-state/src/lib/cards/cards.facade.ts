import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CardsActions from './cards.actions';
import * as CardsFeature from './cards.reducer';
import * as CardsSelectors from './cards.selectors';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { Card } from '@bba/api-interfaces';

let mockCards: Card[] = [
  {
    id: '21789f40-b0fb-4aa6-8e88-376b4edf9jn8',
    title: 'Monastery Swiftspear',
    deckId: '--TBD--',
    description: '',
    manaCost: [new Map<'red', 1>()],
    stats: '1/2',
    textBox: 'Haste, Prowess',
    typeLine: 'Creature - Human Monk',
  },
  {
    id: '21569f40-b3fb-as34-8e88-378b4edf2frg',
    title: 'Lava Dart',
    deckId: '--TBD--',
    description: '',
    manaCost: [new Map<'red', 1>()],
    stats: '',
    textBox: 'Lava Dart deals 1 damage to target creature or player, Flashback',
    typeLine: 'Instant',
  },
];

@Injectable()
export class CardsFacade {
  private cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject(
    mockCards
  );
  currentCards$ = this.cardsSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CardsSelectors.getCardsLoaded));
  allCards$ = this.store.pipe(select(CardsSelectors.getAllCards));
  selectedCards$ = this.store.pipe(select(CardsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CardsActions.init());
  }

  loadCards() {
    return this.currentCards$;
  }

  createCard(card: Card) {
    const cards: Card[] = this.cardsSubject.value;
    const newCard = Object.assign({}, card, { id: uuidv4() });
    const updatedCards: Card[] = [...cards, newCard];
    this.update(updatedCards);
  }

  // TODO: This needs work
  updateCard(card: Card) {
    const cards: Card[] = this.cardsSubject.value;
    const updatedCards: Card[] = cards.map((x) => {
      if (x.id === card.id) x = card;
      return x;
    });
    cards.concat(updatedCards);
    this.update(updatedCards);
  }

  deleteCard(card: Card) {
    const cards: Card[] = this.cardsSubject.value;
    const updatedCards: Card[] = cards.filter((c) => c.id !== card.id);
    this.update(updatedCards);
  }

  update(cards: Card[]) {
    this.cardsSubject.next(cards);
  }
}
