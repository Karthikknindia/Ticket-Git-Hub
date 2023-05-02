import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterlistComponent } from './theaterlist.component';

describe('TheaterlistComponent', () => {
  let component: TheaterlistComponent;
  let fixture: ComponentFixture<TheaterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
