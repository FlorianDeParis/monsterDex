import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/components/header.service';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  logoPath: string = 'assets/img/logo.png';
  showSearch$!: Observable<boolean>;
  search = new FormControl('');


  constructor(
    private header: HeaderService,
    private router: Router
  ){
    this.showSearch$ = this.header.showSearch$;
  }

  ngOnInit(): void {
    if(this.showSearch$){
      this.search.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(
        (value) => {
          console.log("value change "+value);
          if(!!value){
            this.header.setSearchQuery(value);
          } else {
            this.header.resetSearchQuery();
          }
        }
      )
    }
  }

  goToHomePage(): void {
    this.router.navigateByUrl('/');
  }
}
