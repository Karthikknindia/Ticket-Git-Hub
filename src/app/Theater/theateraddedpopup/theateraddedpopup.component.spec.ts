import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheateraddedpopupComponent } from './theateraddedpopup.component';

describe('TheateraddedpopupComponent', () => {
  let component: TheateraddedpopupComponent;
  let fixture: ComponentFixture<TheateraddedpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheateraddedpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheateraddedpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
