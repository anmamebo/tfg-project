import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';

  ngOnInit(): void {
    // Inicialización tema
    const theme = localStorage.getItem('theme');
    if (theme) document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
