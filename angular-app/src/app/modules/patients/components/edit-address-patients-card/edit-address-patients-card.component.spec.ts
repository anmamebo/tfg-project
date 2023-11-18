import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditAddressPatientsCardComponent } from './edit-address-patients-card.component';

describe('EditAddressPatientsCardComponent', () => {
  let component: EditAddressPatientsCardComponent;
  let fixture: ComponentFixture<EditAddressPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddressPatientsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditAddressPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
