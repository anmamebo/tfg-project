import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasRoleDirective } from './has-role.directive';
import { AuthService } from 'src/app/core/services/auth.service';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HasRoleDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TemplateRef, ViewContainerRef],
    });

    // Crea una instancia de la directiva
    const directive = new HasRoleDirective(
      TestBed.inject(AuthService),
      TestBed.inject(TemplateRef),
      TestBed.inject(ViewContainerRef)
    );

    // Verifica si la instancia fue creada correctamente
    expect(directive).toBeTruthy();

    // const directive = new HasRoleDirective();
    // expect(directive).toBeTruthy();
  });
});
