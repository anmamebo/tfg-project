import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMedicalTestsCardComponent } from './view-medical-tests-card.component';

describe('ViewMedicalTestsCardComponent', () => {
  let component: ViewMedicalTestsCardComponent;
  let fixture: ComponentFixture<ViewMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMedicalTestsCardComponent],
    });
    fixture = TestBed.createComponent(ViewMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
