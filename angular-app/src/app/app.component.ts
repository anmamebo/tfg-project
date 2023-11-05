import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';

  ngOnInit(): void {
    // Inicialización tema
    const theme = localStorage.getItem('theme');
    if (theme) document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
