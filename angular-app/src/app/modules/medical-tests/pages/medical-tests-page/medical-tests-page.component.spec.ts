import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsPageComponent } from './medical-tests-page.component';

describe('MedicalTestsPageComponent', () => {
  let component: MedicalTestsPageComponent;
  let fixture: ComponentFixture<MedicalTestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTestsPageComponent]
    });
    fixture = TestBed.createComponent(MedicalTestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
