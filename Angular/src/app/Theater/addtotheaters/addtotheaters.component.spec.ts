import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtotheatersComponent } from './addtotheaters.component';

describe('AddtotheatersComponent', () => {
  let component: AddtotheatersComponent;
  let fixture: ComponentFixture<AddtotheatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtotheatersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtotheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
