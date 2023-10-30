import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  THEME_KEY: string = 'theme';
  sidebarScriptElement: HTMLScriptElement;

  constructor() {
    this.sidebarScriptElement = document.createElement('script');
    this.sidebarScriptElement.src = 'assets/js/components/sidebar.js';
    document.body.appendChild(this.sidebarScriptElement);
  }

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
  }

  private setTheme(theme: string, persist = false) {
    document.body.classList.add(theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    if (persist) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  /**
   * Init theme from setTheme()
   */
  private initTheme() {
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