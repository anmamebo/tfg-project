import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientStatisticsCardsComponent } from './patient-statistics-cards.component';

describe('PatientStatisticsCardsComponent', () => {
  let component: PatientStatisticsCardsComponent;
  let fixture: ComponentFixture<PatientStatisticsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientStatisticsCardsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(PatientStatisticsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
