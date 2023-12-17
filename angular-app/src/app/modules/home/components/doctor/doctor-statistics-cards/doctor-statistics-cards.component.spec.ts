import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorStatisticsCardsComponent } from './doctor-statistics-cards.component';

describe('DoctorStatisticsCardsComponent', () => {
  let component: DoctorStatisticsCardsComponent;
  let fixture: ComponentFixture<DoctorStatisticsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorStatisticsCardsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DoctorStatisticsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
