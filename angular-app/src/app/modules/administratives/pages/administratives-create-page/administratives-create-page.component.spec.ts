import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativesCreatePageComponent } from './administratives-create-page.component';

describe('AdministrativesCreatePageComponent', () => {
  let component: AdministrativesCreatePageComponent;
  let fixture: ComponentFixture<AdministrativesCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativesCreatePageComponent]
    });
    fixture = TestBed.createComponent(AdministrativesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
