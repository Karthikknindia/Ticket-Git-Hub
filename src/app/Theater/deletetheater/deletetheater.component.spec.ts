import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetheaterComponent } from './deletetheater.component';

describe('DeletetheaterComponent', () => {
  let component: DeletetheaterComponent;
  let fixture: ComponentFixture<DeletetheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletetheaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletetheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
