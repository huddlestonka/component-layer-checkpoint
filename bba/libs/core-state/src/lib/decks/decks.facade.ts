import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DecksActions from './decks.actions';
import * as DecksFeature from './decks.reducer';
import * as DecksSelectors from './decks.selectors';

@Injectable()
export class DecksFacade {
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
}
