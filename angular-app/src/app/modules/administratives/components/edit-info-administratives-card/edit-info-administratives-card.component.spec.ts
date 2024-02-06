import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInfoAdministrativesCardComponent } from './edit-info-administratives-card.component';

describe('EditInfoAdministrativesCardComponent', () => {
  let component: EditInfoAdministrativesCardComponent;
  let fixture: ComponentFixture<EditInfoAdministrativesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInfoAdministrativesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditInfoAdministrativesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
