import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterloginComponent } from './theaterlogin.component';

describe('TheaterloginComponent', () => {
  let component: TheaterloginComponent;
  let fixture: ComponentFixture<TheaterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
