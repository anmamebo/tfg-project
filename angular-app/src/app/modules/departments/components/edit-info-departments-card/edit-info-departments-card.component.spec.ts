import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditInfoDepartmentsCardComponent } from './edit-info-departments-card.component';

describe('EditInfoDepartmentsCardComponent', () => {
  let component: EditInfoDepartmentsCardComponent;
  let fixture: ComponentFixture<EditInfoDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInfoDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditInfoDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
