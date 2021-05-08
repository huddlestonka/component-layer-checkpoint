import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CARDS_FEATURE_KEY,
  State,
  CardsPartialState,
  cardsAdapter,
} from './cards.reducer';

// Lookup the 'Cards' feature state managed by NgRx
export const getCardsState = createFeatureSelector<CardsPartialState, State>(
  CARDS_FEATURE_KEY
);

const { selectAll, selectEntities } = cardsAdapter.getSelectors();

export const getCardsLoaded = createSelector(
  getCardsState,
  (state: State) => state.loaded
);

export const getCardsError = createSelector(
  getCardsState,
  (state: State) => state.error
);

export const getAllCards = createSelector(getCardsState, (state: State) =>
  selectAll(state)
);

export const getCardsEntities = createSelector(getCardsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getCardsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCardsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
