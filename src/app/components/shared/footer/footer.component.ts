import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private audioDK = new Audio();
  private isPlaying = false;

  constructor() {
    this.audioDK.src = './assets/audio/dk.mp3';
  }

  ngOnInit(): void {
  }

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

}
