import { CardsEntity } from './cards.models';
import * as CardsActions from './cards.actions';
import { State, initialState, reducer } from './cards.reducer';

describe('Cards Reducer', () => {
  const createCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  beforeEach(() => {});

  describe('valid Cards actions', () => {
    it('loadCardsSuccess should return set the list of known Cards', () => {
      const cards = [
        createCardsEntity('PRODUCT-AAA'),
        createCardsEntity('PRODUCT-zzz'),
      ];
      const action = CardsActions.loadCardsSuccess({ cards });

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
