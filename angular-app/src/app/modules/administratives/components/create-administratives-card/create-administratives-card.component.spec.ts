import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdministrativesCardComponent } from './create-administratives-card.component';

describe('CreateAdministrativesCardComponent', () => {
  let component: CreateAdministrativesCardComponent;
  let fixture: ComponentFixture<CreateAdministrativesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdministrativesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateAdministrativesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
