import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailsComponent } from './decks/deck-details/deck-details.component';
import { DecksListComponent } from './decks/decks-list/decks-list.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { CardsComponent } from './cards/cards.component';
import { CardDetailsComponent } from './cards/card-details/card-details.component';
import { CardsListComponent } from './cards/cards-list/cards-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, DecksComponent, DeckDetailsComponent, DecksListComponent, UsersComponent, UserDetailsComponent, UsersListComponent, CardsComponent, CardDetailsComponent, CardsListComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
