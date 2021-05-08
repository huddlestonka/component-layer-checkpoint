import { DecksEntity } from './decks.models';
import { State, decksAdapter, initialState } from './decks.reducer';
import * as DecksSelectors from './decks.selectors';

describe('Decks Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDecksId = (it) => it['id'];
  const createDecksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DecksEntity);

  let state;

  beforeEach(() => {
    state = {
      decks: decksAdapter.setAll(
        [
          createDecksEntity('PRODUCT-AAA'),
          createDecksEntity('PRODUCT-BBB'),
          createDecksEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Decks Selectors', () => {
    it('getAllDecks() should return the list of Decks', () => {
      const results = DecksSelectors.getAllDecks(state);
      const selId = getDecksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DecksSelectors.getSelected(state);
      const selId = getDecksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDecksLoaded() should return the current 'loaded' status", () => {
      const result = DecksSelectors.getDecksLoaded(state);

      expect(result).toBe(true);
    });

    it("getDecksError() should return the current 'error' state", () => {
      const result = DecksSelectors.getDecksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
