import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { PatientsViewPageComponent } from './patients-view-page.component';

describe('PatientsViewPageComponent', () => {
  let component: PatientsViewPageComponent;
  let fixture: ComponentFixture<PatientsViewPageComponent>;

  class ActivatedRouteStub {
    private subject = new BehaviorSubject({ id: '1' });
    params = this.subject.asObservable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsViewPageComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
