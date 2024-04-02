import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewMedicalTestsAppointmentsDoctorCardComponent } from './view-medical-tests-appointments-doctor-card.component';

describe('ViewMedicalTestsAppointmentsDoctorCardComponent', () => {
  let component: ViewMedicalTestsAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewMedicalTestsAppointmentsDoctorCardComponent>;

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
      declarations: [ViewMedicalTestsAppointmentsDoctorCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ViewMedicalTestsAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
