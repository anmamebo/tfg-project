import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPageComponent } from './doctors-page.component';

describe('DoctorsPageComponent', () => {
  let component: DoctorsPageComponent;
  let fixture: ComponentFixture<DoctorsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsPageComponent]
    });
    fixture = TestBed.createComponent(DoctorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
