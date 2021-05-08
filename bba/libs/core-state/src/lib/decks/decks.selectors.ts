import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DECKS_FEATURE_KEY,
  State,
  DecksPartialState,
  decksAdapter,
} from './decks.reducer';

// Lookup the 'Decks' feature state managed by NgRx
export const getDecksState = createFeatureSelector<DecksPartialState, State>(
  DECKS_FEATURE_KEY
);

const { selectAll, selectEntities } = decksAdapter.getSelectors();

export const getDecksLoaded = createSelector(
  getDecksState,
  (state: State) => state.loaded
);

export const getDecksError = createSelector(
  getDecksState,
  (state: State) => state.error
);

export const getAllDecks = createSelector(getDecksState, (state: State) =>
  selectAll(state)
);

export const getDecksEntities = createSelector(getDecksState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getDecksState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDecksEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
