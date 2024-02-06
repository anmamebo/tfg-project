import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContactInfoPatientsCardComponent } from './view-contact-info-patients-card.component';

describe('ViewContactInfoPatientsCardComponent', () => {
  let component: ViewContactInfoPatientsCardComponent;
  let fixture: ComponentFixture<ViewContactInfoPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContactInfoPatientsCardComponent],
    });
    fixture = TestBed.createComponent(ViewContactInfoPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
