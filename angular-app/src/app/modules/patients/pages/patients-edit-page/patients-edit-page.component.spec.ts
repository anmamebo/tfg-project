import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { PatientsEditPageComponent } from './patients-edit-page.component';


describe('PatientsEditPageComponent', () => {
  let component: PatientsEditPageComponent;
  let fixture: ComponentFixture<PatientsEditPageComponent>;

  const activatedRouteStub = {
    snapshot: {
      data: {
        data: {
          id: 1
        }
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsEditPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
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
