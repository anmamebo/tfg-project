import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ListTreatmentsHistoricalPatientCardComponent } from './list-treatments-historical-patient-card.component';

describe('ListTreatmentsHistoricalPatientCardComponent', () => {
  let component: ListTreatmentsHistoricalPatientCardComponent;
  let fixture: ComponentFixture<ListTreatmentsHistoricalPatientCardComponent>;

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
      declarations: [ListTreatmentsHistoricalPatientCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ListTreatmentsHistoricalPatientCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
