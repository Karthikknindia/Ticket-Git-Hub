import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidpopupComponent } from './invalidpopup.component';

describe('InvalidpopupComponent', () => {
  let component: InvalidpopupComponent;
  let fixture: ComponentFixture<InvalidpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
