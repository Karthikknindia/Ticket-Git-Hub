import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonlymoviesComponent } from './addonlymovies.component';

describe('AddonlymoviesComponent', () => {
  let component: AddonlymoviesComponent;
  let fixture: ComponentFixture<AddonlymoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonlymoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddonlymoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
