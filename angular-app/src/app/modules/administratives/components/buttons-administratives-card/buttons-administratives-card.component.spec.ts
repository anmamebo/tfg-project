import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ButtonsAdministrativesCardComponent } from './buttons-administratives-card.component';

describe('ButtonsAdministrativesCardComponent', () => {
  let component: ButtonsAdministrativesCardComponent;
  let fixture: ComponentFixture<ButtonsAdministrativesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsAdministrativesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsAdministrativesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
