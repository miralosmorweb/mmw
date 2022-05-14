import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BeforeDeathService } from 'src/app/services/before-death.service';
import { ListsService } from 'src/app/services/lists.service';
import { BeforeDeathList, BeforeDeathListWithMovies } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-lists-hidden',
  templateUrl: './lists-hidden.component.html',
  styleUrls: ['./lists-hidden.component.scss']
})
export class ListsHiddenComponent implements OnInit {

  public loading = true;
  public moviesLists: BeforeDeathListWithMovies[] = [];
  public step = 0;

  public password = new FormControl('');

  constructor(
    private beforeDeathService: BeforeDeathService,
  ) { }

  async ngOnInit() {
    this.moviesLists = await this.beforeDeathService.getLists();
    this.loading = false;
    };
  
  public validatePassword() {
    if (this.password.value === 'changuitozeballos') this.step = 1;
  }
}

