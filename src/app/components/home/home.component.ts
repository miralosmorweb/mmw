import { Component, OnInit } from '@angular/core';
import { ListsService, ListModel } from '../../services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private audioDK = new Audio();
  private isPlaying = false;
  public lists: ListModel[] = [];

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

  constructor( private _listsService: ListsService ) {
    this.audioDK.src = './assets/audio/dk.mp3';
  }

  ngOnInit(){
    this._listsService.getLists()
      .subscribe( (resp) => this.lists = resp);
  }
}

