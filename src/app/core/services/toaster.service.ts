import { Injectable } from '@angular/core';
import { Notyf } from 'Notyf';

@Injectable({
  providedIn: 'root'
})
export class ToasterService extends Notyf{
  constructor() {
    super({
      duration: 3000,
      position: {
        x: 'right',
        y: 'bottom'
      }
    })
  }
}
