import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ListsService, ListModel, Movies, MovieResult } from '../../services/lists.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{

  public list: ListModel = new ListModel();
  listName: string;
  movies: Movies[];
  imdbID: number;
  isLoading = true;

  moviesForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private _listsService: ListsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService
              ) {
    // this.activatedRoute.params.subscribe( resp => {
    //   this.list = this._listsService.getList(resp['name']);
    // });
   }

   ngOnInit(){
     this.spinner.show();
     const listName = this.activatedRoute.snapshot.paramMap.get('listName');
     this._listsService.getList(listName).subscribe((resp) => {
       this.list = resp;
       this.listName = listName;
       this.movies = resp.movies;
       this.spinner.hide();
       this.isLoading = false;

      });
   }

  createMoviesForm(){
    this.moviesForm = this.formBuilder.group({
      movies: this.formBuilder.group([])
    });
  }

  randomFilm(movies: Movies[]){
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    this._listsService.getMovie(randomMovie.imdb_id).subscribe( resp => {
      this.imdbID = resp.movie_results[0].id;
      this.router.navigate(['/movie', this.imdbID]);

        });
   }



}
