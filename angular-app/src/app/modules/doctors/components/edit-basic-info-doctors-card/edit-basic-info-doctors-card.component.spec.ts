import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBasicInfoDoctorsCardComponent } from './edit-basic-info-doctors-card.component';

describe('EditBasicInfoDoctorsCardComponent', () => {
  let component: EditBasicInfoDoctorsCardComponent;
  let fixture: ComponentFixture<EditBasicInfoDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBasicInfoDoctorsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditBasicInfoDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
