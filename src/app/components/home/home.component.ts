import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  private audioDK = new Audio();
  private isPlaying = false;

  playAudio(){
    if (!this.isPlaying) {
      this.audioDK.play();
      this.isPlaying = true;
    }
    else {
      this.audioDK.pause();
      this.audioDK.currentTime = 0;
      this.isPlaying = false;
    }
  }
  // playAudio(isPaused: boolean){
  //   if (this.audioDK.onpause) {
  //     this.audioDK.pla;
  //   }
  // }

  constructor() {
    this.audioDK.src = './assets/audio/dk.mp3';
  }
}

