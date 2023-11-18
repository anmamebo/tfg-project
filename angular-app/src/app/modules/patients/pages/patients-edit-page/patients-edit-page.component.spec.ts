import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { PatientsEditPageComponent } from './patients-edit-page.component';

describe('PatientsEditPageComponent', () => {
  let component: PatientsEditPageComponent;
  let fixture: ComponentFixture<PatientsEditPageComponent>;

  class ActivatedRouteStub {
    private subject = new BehaviorSubject({ id: '1' });
    params = this.subject.asObservable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsEditPageComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
