import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DecksEntity } from './decks.models';
import { DecksEffects } from './decks.effects';
import { DecksFacade } from './decks.facade';

import * as DecksSelectors from './decks.selectors';
import * as DecksActions from './decks.actions';
import {
  DECKS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './decks.reducer';

interface TestSchema {
  decks: State;
}

describe('DecksFacade', () => {
  let facade: DecksFacade;
  let store: Store<TestSchema>;
  const createDecksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DecksEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DECKS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DecksEffects]),
        ],
        providers: [DecksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DecksFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDecks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allDecks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDecksSuccess` to manually update list
     */
    it('allDecks$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDecks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DecksActions.loadDecksSuccess({
            decks: [createDecksEntity('AAA'), createDecksEntity('BBB')],
          })
        );

        list = await readFirst(facade.allDecks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
