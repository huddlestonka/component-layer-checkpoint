import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from '@bba/api-interfaces';

@Component({
  selector: 'bba-decks-list',
  templateUrl: './decks-list.component.html',
  styleUrls: ['./decks-list.component.scss'],
})
export class DecksListComponent {
  @Input() decks: Deck[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
