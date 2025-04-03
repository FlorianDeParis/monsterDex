import { Component } from '@angular/core';
import { environment } from '../../env/environment';


@Component({
  selector: 'app-uisounds',
  imports: [],
  templateUrl: './uisounds.component.html',
  styleUrl: './uisounds.component.scss'
})
export class UISoundsComponent {
  audioFile!: string

  playSound(){
    const audio = new Audio(`${environment.AUDIO_PATH}emerald_0005.wav`);
    audio.play().catch(error => console.error('Erreur de lecture du son:', error));
  }
}
