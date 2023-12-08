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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initTheme();
  }

  ngAfterViewInit(): void {
    const toggler = document.getElementById('toggle-dark') as HTMLInputElement;
    const theme = localStorage.getItem(this.THEME_KEY);

    if (toggler) {
      toggler.checked = theme === 'dark';

      toggler.addEventListener('input', (e) => {
        if (!e.target) return;
        this.setTheme(
          (<HTMLInputElement>e.target).checked ? 'dark' : 'light',
          true
        );
      });
    }

    // Obtiene el elemento HTML del sidebar.
    this.sidebarEL = this.elementRef.nativeElement.querySelector('#sidebar');
    this.onFirstLoad(); // Ejecuta el método onFirstLoad() para inicializar el sidebar.
    this.initializeEventListeners(); // Inicializa los eventos del sidebar.
  }

  /**
   * Verifica si el ancho de la ventana es mayor a 1200px.
   * @returns boolean true si el ancho de la ventana es mayor a 1200px, false en caso contrario.
   */
  private isDesktop(): boolean {
    return window.innerWidth > 1200;
  }

  /**
   * Inicializa el sidebar.
   */
  private onFirstLoad(): void {
    if (!this.sidebarEL) return;
    if (this.isDesktop()) {
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
        const height = this.calculateChildrenHeight(submenu, true);
      }, 50);
    });
  }

  /**
   * Inicializa los eventos del sidebar.
   */
  private initializeEventListeners(): void {
    if (!this.sidebarEL) return;

    document
      .querySelectorAll('.burger-btn')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)));
    document
      .querySelectorAll('.sidebar-hide')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)));
    window.addEventListener('resize', this.onResize.bind(this));

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

            const height = this.calculateChildrenHeight(
              item.parentElement as HTMLElement,
              true
            );
          }
        });
      });
    });
  }

  /**
   * Evento que se ejecuta cuando se redimensiona la ventana.
   */
  private onResize(): void {
    if (!this.sidebarEL) return;
    if (this.isDesktop()) {
      this.sidebarEL.classList.add('active');
      this.sidebarEL.classList.remove('inactive');
    } else {
      this.sidebarEL.classList.remove('active');
    }

    this.deleteBackdrop();
    this.toggleOverFlowBody(true);
  }

  /**
   * Muestra u oculta el sidebar.
   */
  private toggle(): void {
    if (!this.sidebarEL) return;
    const sidebarState = this.sidebarEL.classList.contains('active');
    if (sidebarState) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Muestra el sidebar.
   */
  private show(): void {
    if (!this.sidebarEL) return;
    this.sidebarEL.classList.add('active');
    this.sidebarEL.classList.remove('inactive');
    this.createBackdrop();
    this.toggleOverFlowBody();
  }

  /**
   * Oculta el sidebar.
   */
  private hide(): void {
    if (!this.sidebarEL) return;
    this.sidebarEL.classList.remove('active');
    this.sidebarEL.classList.add('inactive');
    this.deleteBackdrop();
    this.toggleOverFlowBody();
  }

  /**
   * Crea el backdrop del sidebar.
   */
  private createBackdrop(): void {
    if (this.isDesktop()) return;
    this.deleteBackdrop();
    const backdrop = document.createElement('div');
    backdrop.classList.add('sidebar-backdrop');
    backdrop.addEventListener('click', this.hide.bind(this));
    document.body.appendChild(backdrop);
  }

  /**
   * Elimina el backdrop del sidebar.
   */
  private deleteBackdrop(): void {
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Muestra u oculta el overflow del body.
   * @param active boolean true para mostrar el overflow del body, false para ocultarlo.
   */
  private toggleOverFlowBody(active?: boolean): void {
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
   * Calcula la altura de los hijos del sidebar.
   * @param el HTMLElement elemento HTML del sidebar.
   * @param deep boolean true para calcular la altura de los hijos de los hijos del sidebar, false para calcular la altura de los hijos directos del sidebar.
   * @returns number altura de los hijos del sidebar.
   */
  private calculateChildrenHeight(el: HTMLElement, deep = false): number {
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
   * Establece el tema de la aplicación.
   * @param theme string tema de la aplicación.
   * @param persist boolean true para persistir el tema en el localStorage, false en caso contrario.
   */
  private setTheme(theme: string, persist = false): void {
    document.body.classList.add(theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    if (persist) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  /**
   * Inicializa el tema de la aplicación.
   */
  private initTheme(): void {
    //If the user manually set a theme, we'll load that
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    if (storedTheme) {
      return this.setTheme(storedTheme);
    }
    //Detect if the user set his preferred color scheme to dark
    if (!window.matchMedia) {
      return;
    }

    //Media query to detect dark preference
    const mediaQuery = window.matchMedia('(prefers-color-schema: dark)');

    //Register change listener
    mediaQuery.addEventListener('change', (e) =>
      this.setTheme(e.matches ? 'dark' : 'light', true)
    );
    return this.setTheme(mediaQuery.matches ? 'dark' : 'light', true);
  }
}
