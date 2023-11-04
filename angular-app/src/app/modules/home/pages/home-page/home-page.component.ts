import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [AuthService],
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public logout() {
    this.authService.logOut().subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
