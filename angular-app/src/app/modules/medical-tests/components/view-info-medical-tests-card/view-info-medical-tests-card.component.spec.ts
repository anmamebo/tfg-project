import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInfoMedicalTestsCardComponent } from './view-info-medical-tests-card.component';

describe('ViewInfoMedicalTestsCardComponent', () => {
  let component: ViewInfoMedicalTestsCardComponent;
  let fixture: ComponentFixture<ViewInfoMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoMedicalTestsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewInfoMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
