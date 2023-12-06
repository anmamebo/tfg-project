import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewRoomsDepartmentsCardComponent } from './view-rooms-departments-card.component';

describe('ViewRoomsDepartmentsCardComponent', () => {
  let component: ViewRoomsDepartmentsCardComponent;
  let fixture: ComponentFixture<ViewRoomsDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRoomsDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewRoomsDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
