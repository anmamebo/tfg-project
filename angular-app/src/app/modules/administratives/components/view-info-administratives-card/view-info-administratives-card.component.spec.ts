import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInfoAdministrativesCardComponent } from './view-info-administratives-card.component';

describe('ViewInfoAdministrativesCardComponent', () => {
  let component: ViewInfoAdministrativesCardComponent;
  let fixture: ComponentFixture<ViewInfoAdministrativesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoAdministrativesCardComponent],
    });
    fixture = TestBed.createComponent(ViewInfoAdministrativesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
