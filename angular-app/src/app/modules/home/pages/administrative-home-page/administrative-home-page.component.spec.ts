import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrativeHomePageComponent } from './administrative-home-page.component';

describe('AdministrativeHomePageComponent', () => {
  let component: AdministrativeHomePageComponent;
  let fixture: ComponentFixture<AdministrativeHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativeHomePageComponent],
    });
    fixture = TestBed.createComponent(AdministrativeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
