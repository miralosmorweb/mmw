import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService, MovieDetail, Cast } from '../../services/lists.service';
import { Location } from '@angular/common' ;


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {

  public movie: MovieDetail;
  cast: Cast[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private _listsService: ListsService,
               private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this._listsService.getMovieDetail( id ).subscribe( movie => {
      this.movie = movie;
    });
    this._listsService.getCast( id ).subscribe( cast =>
      this.cast = cast);
  }

  goBack(){
    this.location.back();

  }

}
