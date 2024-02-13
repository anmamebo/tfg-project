import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSpecialtiesDepartmentsCardComponent } from './view-specialties-departments-card.component';

describe('ViewSpecialtiesDepartmentsCardComponent', () => {
  let component: ViewSpecialtiesDepartmentsCardComponent;
  let fixture: ComponentFixture<ViewSpecialtiesDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSpecialtiesDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewSpecialtiesDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
