import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListDoctorsCardComponent } from './list-doctors-card.component';

describe('ListDoctorsCardComponent', () => {
  let component: ListDoctorsCardComponent;
  let fixture: ComponentFixture<ListDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDoctorsCardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
