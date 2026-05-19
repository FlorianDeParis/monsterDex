import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath: string = 'assets/img/logo.png';

  constructor(
    private router: Router
  ){}

  goToHomePage(): void {
    this.router.navigateByUrl('/');
  }
}
