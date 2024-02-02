import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { MedicalTestsViewPageComponent } from './medical-tests-view-page.component';

describe('MedicalTestsViewPageComponent', () => {
  let component: MedicalTestsViewPageComponent;
  let fixture: ComponentFixture<MedicalTestsViewPageComponent>;

  const activatedRouteStub = {
    snapshot: {
      data: {
        data: {
          id: 1,
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalTestsViewPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTestsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
