import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAttachmentsMedicalTestsCardComponent } from './view-attachments-medical-tests-card.component';

describe('ViewAttachmentsMedicalTestsCardComponent', () => {
  let component: ViewAttachmentsMedicalTestsCardComponent;
  let fixture: ComponentFixture<ViewAttachmentsMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAttachmentsMedicalTestsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewAttachmentsMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
