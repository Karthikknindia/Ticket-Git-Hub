import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterhomeComponent } from './theaterhome.component';

describe('TheaterhomeComponent', () => {
  let component: TheaterhomeComponent;
  let fixture: ComponentFixture<TheaterhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
