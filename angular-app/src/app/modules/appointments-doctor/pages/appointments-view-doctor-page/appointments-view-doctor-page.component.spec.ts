import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsViewDoctorPageComponent } from './appointments-view-doctor-page.component';

describe('AppointmentsViewDoctorPageComponent', () => {
  let component: AppointmentsViewDoctorPageComponent;
  let fixture: ComponentFixture<AppointmentsViewDoctorPageComponent>;

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
      declarations: [AppointmentsViewDoctorPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsViewDoctorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
