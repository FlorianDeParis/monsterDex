import { HeaderService } from './../../core/services/components/header.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../core/components/header/header.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setSearch(false);
  }

  start() {
    this.router.navigateByUrl('/pokedexes');
  }
}
