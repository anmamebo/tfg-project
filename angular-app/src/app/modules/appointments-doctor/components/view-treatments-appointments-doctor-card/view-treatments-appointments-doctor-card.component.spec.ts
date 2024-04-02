import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewTreatmentsAppointmentsDoctorCardComponent } from './view-treatments-appointments-doctor-card.component';

describe('ViewTreatmentsAppointmentsDoctorCardComponent', () => {
  let component: ViewTreatmentsAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewTreatmentsAppointmentsDoctorCardComponent>;

  const activatedRouteStub = {
    snapshot: {
      data: {
        data: {
          id: 1,
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTreatmentsAppointmentsDoctorCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ViewTreatmentsAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
