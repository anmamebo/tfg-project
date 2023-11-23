import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactInfoDoctorsCardComponent } from './view-contact-info-doctors-card.component';

describe('ViewContactInfoDoctorsCardComponent', () => {
  let component: ViewContactInfoDoctorsCardComponent;
  let fixture: ComponentFixture<ViewContactInfoDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContactInfoDoctorsCardComponent]
    });
    fixture = TestBed.createComponent(ViewContactInfoDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
