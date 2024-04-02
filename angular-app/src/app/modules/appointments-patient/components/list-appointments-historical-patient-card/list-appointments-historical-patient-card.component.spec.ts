import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ListAppointmentsHistoricalPatientCardComponent } from './list-appointments-historical-patient-card.component';

describe('ListAppointmentsHistoricalPatientCardComponent', () => {
  let component: ListAppointmentsHistoricalPatientCardComponent;
  let fixture: ComponentFixture<ListAppointmentsHistoricalPatientCardComponent>;

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
      declarations: [ListAppointmentsHistoricalPatientCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ListAppointmentsHistoricalPatientCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
