import { DecksEntity } from './decks.models';
import * as DecksActions from './decks.actions';
import { State, initialState, reducer } from './decks.reducer';

describe('Decks Reducer', () => {
  const createDecksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DecksEntity);

  beforeEach(() => {});

  describe('valid Decks actions', () => {
    it('loadDecksSuccess should return set the list of known Decks', () => {
      const decks = [
        createDecksEntity('PRODUCT-AAA'),
        createDecksEntity('PRODUCT-zzz'),
      ];
      const action = DecksActions.loadDecksSuccess({ decks });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
