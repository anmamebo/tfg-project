import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDoctorsCardComponent } from './create-doctors-card.component';

describe('CreateDoctorsCardComponent', () => {
  let component: CreateDoctorsCardComponent;
  let fixture: ComponentFixture<CreateDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDoctorsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
