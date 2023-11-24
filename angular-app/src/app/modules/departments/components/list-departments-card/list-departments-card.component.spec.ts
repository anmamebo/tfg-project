import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListDepartmentsCardComponent } from './list-departments-card.component';

describe('ListDepartmentsCardComponent', () => {
  let component: ListDepartmentsCardComponent;
  let fixture: ComponentFixture<ListDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepartmentsCardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
