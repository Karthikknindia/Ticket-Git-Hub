import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtheatorComponent } from './addtheator.component';

describe('AddtheatorComponent', () => {
  let component: AddtheatorComponent;
  let fixture: ComponentFixture<AddtheatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtheatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtheatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
