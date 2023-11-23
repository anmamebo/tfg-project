import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorsViewPageComponent } from './doctors-view-page.component';
import { ActivatedRoute } from '@angular/router';

describe('DoctorsViewPageComponent', () => {
  let component: DoctorsViewPageComponent;
  let fixture: ComponentFixture<DoctorsViewPageComponent>;

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
      declarations: [DoctorsViewPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
