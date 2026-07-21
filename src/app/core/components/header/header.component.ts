import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/components/header.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath: string = 'assets/img/logo.png';
  showSearch$!: Observable<boolean>;


  constructor(
    private header: HeaderService,
    private router: Router
  ){
    this.showSearch$ = this.header.showSearch$;
  }

  goToHomePage(): void {
    this.router.navigateByUrl('/');
  }
}
