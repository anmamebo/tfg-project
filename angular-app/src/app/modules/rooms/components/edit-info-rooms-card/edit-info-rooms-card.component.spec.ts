import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditInfoRoomsCardComponent } from './edit-info-rooms-card.component';

describe('EditInfoRoomsCardComponent', () => {
  let component: EditInfoRoomsCardComponent;
  let fixture: ComponentFixture<EditInfoRoomsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInfoRoomsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditInfoRoomsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
