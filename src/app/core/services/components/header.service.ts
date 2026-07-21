import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private showSearchSubject = new BehaviorSubject(false);

  showSearch$ = this.showSearchSubject.asObservable();

  setSearch(value: boolean){
    this.showSearchSubject.next(value);
  }
}
