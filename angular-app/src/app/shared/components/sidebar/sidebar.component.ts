import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

/**
 * Componente que representa el sidebar de la aplicación.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  /** Clave para almacenar el tema en el localStorage. */
  THEME_KEY: string = 'theme';

  /** Referencia al elemento HTML del sidebar. */
  sidebarEL: HTMLElement | null = null;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit(): void {
    this._initTheme();
  }

  ngAfterViewInit(): void {
    const toggler = document.getElementById('toggle-dark') as HTMLInputElement;
    const theme = localStorage.getItem(this.THEME_KEY);

    if (toggler) {
      toggler.checked = theme === 'dark';

      toggler.addEventListener('input', (e) => {
        if (!e.target) return;
        this._setTheme(
          (<HTMLInputElement>e.target).checked ? 'dark' : 'light',
          true
        );
      });
    }

    // Obtiene el elemento HTML del sidebar.
    this.sidebarEL = this._elementRef.nativeElement.querySelector('#sidebar');
    this._onFirstLoad(); // Ejecuta el método onFirstLoad() para inicializar el sidebar.
    this._initializeEventListeners(); // Inicializa los eventos del sidebar.
  }

  /**
   * Determina si la ventana actual corresponde a un entorno de escritorio basándose en el ancho de la ventana.
   * @private
   * @returns {boolean} Devuelve true si la ventana es considerada como un entorno de escritorio; de lo contrario, devuelve false.
   */
  private _isDesktop(): boolean {
    return window.innerWidth > 1200;
  }

  /**
   * Realiza acciones específicas en la carga inicial de la barra lateral, estableciendo clases y configuraciones iniciales.
   * @private
   * @returns {void}
   */
  private _onFirstLoad(): void {
    if (!this.sidebarEL) return;
    if (this._isDesktop()) {
      this.sidebarEL.classList.add('active');
      this.sidebarEL.classList.add('sidebar-desktop');
    }

    let submenus = this.sidebarEL.querySelectorAll(
      '.sidebar-item.has-sub .submenu'
    ) as NodeListOf<HTMLElement>;
    submenus.forEach((submenu: HTMLElement) => {
      const sidebarItem = submenu.parentElement as HTMLElement;
      const height = submenu.clientHeight;

      if (sidebarItem.classList.contains('active')) {
        submenu.classList.add('submenu-open');
      } else {
        submenu.classList.add('submenu-closed');
      }

      setTimeout(() => {
        const height = this._calculateChildrenHeight(submenu, true);
      }, 50);
    });
  }

  /**
   * Inicializa los event listeners para la barra lateral y sus elementos interactivos.
   * @private
   * @returns {void}
   */
  private _initializeEventListeners(): void {
    if (!this.sidebarEL) return;

    document
      .querySelectorAll('.burger-btn')
      .forEach((el) => el.addEventListener('click', this._toggle.bind(this)));
    document
      .querySelectorAll('.sidebar-hide')
      .forEach((el) => el.addEventListener('click', this._toggle.bind(this)));
    window.addEventListener('resize', this._onResize.bind(this));

    const toggleSubmenu = (el: HTMLElement) => {
      if (el.classList.contains('submenu-open')) {
        el.classList.remove('submenu-open');
        el.classList.add('submenu-closed');
      } else {
        el.classList.remove('submenu-closed');
        el.classList.add('submenu-open');
      }
    };

    const sidebarItems = Array.from(
      this.sidebarEL.querySelectorAll('.sidebar-item.has-sub')
    ) as HTMLElement[];
    sidebarItems.forEach((sidebarItem) => {
      const sidebarLink = sidebarItem.querySelector('.sidebar-link');
      sidebarLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = sidebarItem.querySelector(
          '.submenu'
        ) as HTMLElement | null;
        if (submenu) {
          toggleSubmenu(submenu);
        }
      });

      const submenuItems = Array.from(
        sidebarItem.querySelectorAll('.submenu-items.has-sub')
      ) as HTMLElement[];
      submenuItems.forEach((item) => {
        item.addEventListener('click', () => {
          const submenuLevelTwo = item.querySelector(
            '.submenu'
          ) as HTMLElement | null;
          if (submenuLevelTwo) {
            toggleSubmenu(submenuLevelTwo);

            const height = this._calculateChildrenHeight(
              item.parentElement as HTMLElement,
              true
            );
          }
        });
      });
    });
  }

  /**
   * Maneja el evento de redimensionamiento de la ventana para la barra lateral.
   * @private
   * @returns {void}
   */
  private _onResize(): void {
    if (!this.sidebarEL) return;
    if (this._isDesktop()) {
      this.sidebarEL.classList.add('active');
      this.sidebarEL.classList.remove('inactive');
    } else {
      this.sidebarEL.classList.remove('active');
    }

    this._deleteBackdrop();
    this._toggleOverFlowBody(true);
  }

  /**
   * Alternar la visibilidad de la barra lateral.
   * @private
   * @returns {void}
   */

  private _toggle(): void {
    if (!this.sidebarEL) return;
    const sidebarState = this.sidebarEL.classList.contains('active');
    if (sidebarState) {
      this._hide();
    } else {
      this._show();
    }
  }

  /**
   * Muestra la barra lateral.
   * @private
   * @returns {void}
   */
  private _show(): void {
    if (!this.sidebarEL) return;
    this.sidebarEL.classList.add('active');
    this.sidebarEL.classList.remove('inactive');
    this._createBackdrop();
    this._toggleOverFlowBody();
  }

  /**
   * Oculta la barra lateral.
   * @private
   * @returns {void}
   */
  private _hide(): void {
    if (!this.sidebarEL) return;
    this.sidebarEL.classList.remove('active');
    this.sidebarEL.classList.add('inactive');
    this._deleteBackdrop();
    this._toggleOverFlowBody();
  }

  /**
   * Crea un fondo oscuro para la barra lateral cuando está en modo móvil.
   * @private
   * @returns {void}
   */
  private _createBackdrop(): void {
    if (this._isDesktop()) return;
    this._deleteBackdrop();
    const backdrop = document.createElement('div');
    backdrop.classList.add('sidebar-backdrop');
    backdrop.addEventListener('click', this._hide.bind(this));
    document.body.appendChild(backdrop);
  }

  /**
   * Elimina el fondo oscuro de la barra lateral, si existe.
   * @private
   * @returns {void}
   */
  private _deleteBackdrop(): void {
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Controla el estado de desbordamiento del cuerpo (overflow) dependiendo del estado de la barra lateral.
   * @private
   * @param {boolean | undefined} [active] - Valor opcional para el desbordamiento del cuerpo.
   * @returns {void}
   */
  private _toggleOverFlowBody(active?: boolean): void {
    const body = document.querySelector('body');
    if (!this.sidebarEL || !body) return;
    const sidebarState = this.sidebarEL.classList.contains('active');
    if (typeof active === 'undefined') {
      body.style.overflowY = sidebarState ? 'hidden' : 'auto';
    } else {
      body.style.overflowY = active ? 'auto' : 'hidden';
    }
  }

  /**
   * Calcula la altura de los elementos secundarios de un elemento HTML.
   * @private
   * @param {HTMLElement} el - El elemento del cual se calculará la altura de los elementos secundarios.
   * @param {boolean} [deep=false] - Indica si se debe calcular la altura de los elementos secundarios anidados.
   * @returns {number} La altura total de los elementos secundarios.
   */
  private _calculateChildrenHeight(el: HTMLElement, deep = false): number {
    let height = 0;
    const children = Array.from(el.children);

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const submenuLink = child.querySelector(
        '.submenu-link'
      ) as HTMLElement | null;

      if (submenuLink) {
        height += submenuLink.clientHeight;

        if (deep && child.classList.contains('has-sub')) {
          const subsubmenu = child.querySelector(
            '.submenu'
          ) as HTMLElement | null;

          if (subsubmenu && subsubmenu.classList.contains('submenu-open')) {
            const submenuLinks = Array.from(
              subsubmenu.querySelectorAll('.submenu-link')
            ) as HTMLElement[];
            const childrenHeight = submenuLinks.reduce(
              (acc, curr) => acc + curr.clientHeight,
              0
            );
            height += childrenHeight;
          }
        }
      }
    }
    el.style.setProperty('--submenu-height', height + 'px');
    return height;
  }

  /**
   * Establece un tema específico en el cuerpo del documento y en el atributo 'data-bs-theme' del elemento raíz.
   * @private
   * @param {string} theme - El nombre del tema a aplicar.
   * @param {boolean} [persist=false] - Indica si se debe persistir el tema en el almacenamiento local.
   * Si es verdadero, el tema se guardará en el almacenamiento local.
   */
  private _setTheme(theme: string, persist = false): void {
    document.body.classList.add(theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    if (persist) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  /**
   * Inicializa el tema de la aplicación.
   * Comprueba si hay un tema almacenado localmente y lo aplica si existe.
   * Si no hay un tema almacenado, verifica la preferencia de color del usuario y aplica el tema correspondiente (claro u oscuro).
   * @private
   * @returns {void}
   */
  private _initTheme(): void {
    //If the user manually set a theme, we'll load that
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    if (storedTheme) {
      return this._setTheme(storedTheme);
    }
    //Detect if the user set his preferred color scheme to dark
    if (!window.matchMedia) {
      return;
    }

    //Media query to detect dark preference
    const mediaQuery = window.matchMedia('(prefers-color-schema: dark)');

    //Register change listener
    mediaQuery.addEventListener('change', (e) =>
      this._setTheme(e.matches ? 'dark' : 'light', true)
    );
    return this._setTheme(mediaQuery.matches ? 'dark' : 'light', true);
  }
}
