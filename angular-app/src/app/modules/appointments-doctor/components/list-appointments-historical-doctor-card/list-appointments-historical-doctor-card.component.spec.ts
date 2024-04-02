import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ListAppointmentsHistoricalDoctorCardComponent } from './list-appointments-historical-doctor-card.component';

describe('ListAppointmentsHistoricalDoctorCardComponent', () => {
  let component: ListAppointmentsHistoricalDoctorCardComponent;
  let fixture: ComponentFixture<ListAppointmentsHistoricalDoctorCardComponent>;

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
      declarations: [ListAppointmentsHistoricalDoctorCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
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
