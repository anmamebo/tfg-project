import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDoctorsDepartmentsCardComponent } from './view-doctors-departments-card.component';

describe('ViewDoctorsDepartmentsCardComponent', () => {
  let component: ViewDoctorsDepartmentsCardComponent;
  let fixture: ComponentFixture<ViewDoctorsDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDoctorsDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewDoctorsDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
