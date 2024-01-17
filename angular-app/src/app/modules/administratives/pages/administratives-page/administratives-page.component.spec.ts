import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdministrativesPageComponent } from './administratives-page.component';

describe('AdministrativesPageComponent', () => {
  let component: AdministrativesPageComponent;
  let fixture: ComponentFixture<AdministrativesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativesPageComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AdministrativesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
