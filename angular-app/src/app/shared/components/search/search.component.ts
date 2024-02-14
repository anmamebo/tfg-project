import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Componente que representa un buscador.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  /** Texto del tooltip de información. */
  @Input() public infoTooltipText: string = '';

  /** Evento que se lanza al pulsar el botón de buscar. */
  @Output() public searchSubmitted: EventEmitter<string> =
    new EventEmitter<string>();

  /** Formulario de búsqueda. */
  public formSearch: FormGroup;

  /** Indica si la búsqueda se realiza en la URL. */
  @Input() public urlSearch: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.formSearch = this._fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this._patchUrlSearchTermValue();
  }

  /**
   * Envia el término de búsqueda obtenido del formulario.
   * @returns {void}
   * @public
   */
  public submitSearch(): void {
    const searchTerm = this.formSearch.get('searchTerm')?.value;
    this.searchSubmitted.emit(searchTerm);

    this._setUrlSearchParam(searchTerm);
  }

  /**
   * Limpia el formulario de búsqueda.
   * @returns {void}
   * @public
   */
  public clearSearch(): void {
    this.formSearch.reset();
    this.searchSubmitted.emit('');

    this._unsetUrlSearchParam();
  }

  /**
   * Establece el valor del término de búsqueda en el formulario.
   * @returns {void}
   * @private
   */
  private _patchUrlSearchTermValue(): void {
    if (this.urlSearch) {
      this._route.queryParams.subscribe((params) => {
        const searchTerm = params['q'];
        if (searchTerm) {
          this.formSearch.patchValue({ searchTerm: searchTerm });
        }
      });
    }
  }

  /**
   * Establece el término de búsqueda en la URL.
   * @param {string} searchTerm - Término de búsqueda.
   * @returns {void}
   * @private
   */
  private _setUrlSearchParam(searchTerm: string): void {
    if (this.urlSearch) {
      this._router.navigate([], {
        queryParams: { q: searchTerm },
        queryParamsHandling: 'merge',
      });
    }
  }

  /**
   * Elimina el término de búsqueda de la URL.
   * @returns {void}
   * @private
   */
  private _unsetUrlSearchParam(): void {
    if (this.urlSearch) {
      this._router.navigate([], {
        queryParams: { q: null },
        queryParamsHandling: 'merge',
      });
    }
  }
}
