import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditContactInfoDoctorsCardComponent } from './edit-contact-info-doctors-card.component';

describe('EditContactInfoDoctorsCardComponent', () => {
  let component: EditContactInfoDoctorsCardComponent;
  let fixture: ComponentFixture<EditContactInfoDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactInfoDoctorsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditContactInfoDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
