import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditContactInfoPatientsCardComponent } from './edit-contact-info-patients-card.component';

describe('EditContactInfoPatientsCardComponent', () => {
  let component: EditContactInfoPatientsCardComponent;
  let fixture: ComponentFixture<EditContactInfoPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactInfoPatientsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditContactInfoPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
