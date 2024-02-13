import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Componente que representa un buscador.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  /** Texto del tooltip de información. */
  @Input() public infoTooltipText: string = '';

  /** Evento que se lanza al pulsar el botón de buscar. */
  @Output() public searchSubmitted: EventEmitter<string> =
    new EventEmitter<string>();

  /** Formulario de búsqueda. */
  public formSearch: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formSearch = this._fb.group({
      searchTerm: [''],
    });
  }

  /**
   * Envia el término de búsqueda obtenido del formulario.
   * @public
   * @returns {void}
   */
  public submitSearch(): void {
    const searchTerm = this.formSearch.get('searchTerm')?.value;
    this.searchSubmitted.emit(searchTerm);
  }

  /**
   * Limpia el formulario de búsqueda.
   * @public
   * @returns {void}
   */
  public clearSearch(): void {
    this.formSearch.reset();
    this.searchSubmitted.emit('');
  }
}
