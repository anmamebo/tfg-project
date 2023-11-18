import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditBasicInfoPatientsCardComponent } from './edit-basic-info-patients-card.component';

describe('EditBasicInfoPatientsCardComponent', () => {
  let component: EditBasicInfoPatientsCardComponent;
  let fixture: ComponentFixture<EditBasicInfoPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBasicInfoPatientsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditBasicInfoPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
