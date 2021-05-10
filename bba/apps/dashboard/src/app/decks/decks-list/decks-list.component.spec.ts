import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule } from '@bba/core-state';
import { MaterialModule } from '@bba/material';
import { DecksListComponent } from './decks-list.component';

describe('DecksListComponent', () => {
  let component: DecksListComponent;
  let fixture: ComponentFixture<DecksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecksListComponent],
      imports: [
        CoreDataModule,
        CoreStateModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
