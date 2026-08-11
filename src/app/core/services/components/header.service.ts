import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private showSearchSubject = new BehaviorSubject(false);

  showSearch$ = this.showSearchSubject.asObservable();

  private querySignal = signal('');
  readonly query = this.querySignal.asReadonly();

  setSearch(value: boolean){
    this.showSearchSubject.next(value);
    !value && this.resetSearchQuery();
  }

  setSearchQuery(query: string){
    this.querySignal.set(query);
  }

  resetSearchQuery(){
    this.querySignal.set('');
  }
}
