import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDepartmentsCardComponent } from './create-departments-card.component';

describe('CreateDepartmentsCardComponent', () => {
  let component: CreateDepartmentsCardComponent;
  let fixture: ComponentFixture<CreateDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
