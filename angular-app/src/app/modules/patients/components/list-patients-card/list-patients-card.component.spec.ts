import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListPatientsCardComponent } from './list-patients-card.component';

describe('ListPatientsCardComponent', () => {
  let component: ListPatientsCardComponent;
  let fixture: ComponentFixture<ListPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPatientsCardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
