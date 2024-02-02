import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Modelo
import { MedicalTest } from 'src/app/core/models/medical-test.interface';

/**
 * Componente que representa una tarjeta de visualización de pruebas médicas.
 */
@Component({
  selector: 'app-view-medical-tests-card',
  templateUrl: './view-medical-tests-card.component.html',
  styleUrls: ['./view-medical-tests-card.component.scss'],
})
export class ViewMedicalTestsCardComponent implements OnInit {
  /** Preueba Médica */
  @Input() public medicalTest: MedicalTest | null = null;

  /** Título de la tarjeta */
  public cardTitle: string = 'Prueba médica';

  ngOnInit(): void {
    this._generateTitle();
  }

  /**
   * Genera el título de la tarjeta.
   * @returns {void}
   * @private
   */
  private _generateTitle(): void {
    if (this.medicalTest) {
      const medicalTestDate = new Date(this.medicalTest.date_prescribed);
      const date = format(medicalTestDate, 'dd, MMMM yyyy', { locale: es });
      this.cardTitle = `${date} | ${this.medicalTest.name}`;
    }
  }
}
