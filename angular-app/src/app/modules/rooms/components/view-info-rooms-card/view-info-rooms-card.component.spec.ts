import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInfoRoomsCardComponent } from './view-info-rooms-card.component';

describe('ViewInfoRoomsCardComponent', () => {
  let component: ViewInfoRoomsCardComponent;
  let fixture: ComponentFixture<ViewInfoRoomsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoRoomsCardComponent],
    });
    fixture = TestBed.createComponent(ViewInfoRoomsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
