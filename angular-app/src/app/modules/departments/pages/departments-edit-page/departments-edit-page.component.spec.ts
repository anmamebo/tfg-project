import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { DepartmentsEditPageComponent } from './departments-edit-page.component';

describe('DepartmentsEditPageComponent', () => {
  let component: DepartmentsEditPageComponent;
  let fixture: ComponentFixture<DepartmentsEditPageComponent>;

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
      declarations: [DepartmentsEditPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
