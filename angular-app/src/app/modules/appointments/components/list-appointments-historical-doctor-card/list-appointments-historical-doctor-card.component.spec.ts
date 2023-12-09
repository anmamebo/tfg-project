import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListAppointmentsHistoricalDoctorCardComponent } from './list-appointments-historical-doctor-card.component';

describe('ListAppointmentsHistoricalDoctorCardComponent', () => {
  let component: ListAppointmentsHistoricalDoctorCardComponent;
  let fixture: ComponentFixture<ListAppointmentsHistoricalDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAppointmentsHistoricalDoctorCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ListAppointmentsHistoricalDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
