import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


/**
 * Componente que representa un buscador.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /** Evento que se lanza al pulsar el botón de buscar. */
  @Output() public searchSubmitted: EventEmitter<string> = new EventEmitter<string>();

  /** Formulario de búsqueda. */
  public formSearch: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formSearch = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  /**
   * Emite el evento searchSubmitted.
   */
  public submitSearch(): void {
    const searchTerm = this.formSearch.get('searchTerm')?.value;
    this.searchSubmitted.emit(searchTerm);
  }
}
