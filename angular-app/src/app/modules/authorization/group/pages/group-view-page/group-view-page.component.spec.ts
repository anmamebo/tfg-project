import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { GroupViewPageComponent } from './group-view-page.component';


describe('GroupViewPageComponent', () => {
  let component: GroupViewPageComponent;
  let fixture: ComponentFixture<GroupViewPageComponent>;

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
      declarations: [ GroupViewPageComponent ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
