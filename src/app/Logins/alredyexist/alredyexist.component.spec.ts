import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlredyexistComponent } from './alredyexist.component';

describe('AlredyexistComponent', () => {
  let component: AlredyexistComponent;
  let fixture: ComponentFixture<AlredyexistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlredyexistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlredyexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
