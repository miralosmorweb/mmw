import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ListModel, Movies, MovieResult} from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {

  imdbMovies: MovieResult[] = [];
  page: number = 1;

  @Input() movies: Movies[];

  constructor( private _listsService: ListsService,
               private router: Router) { }

  ngOnInit(): void {
    this.getMoviesDetails(this.movies.slice(0, 18));
  }

  onScrollDown() {
    this.getMoviesDetails(this.movies.slice(this.page * 18, (this.page * 18) + 18));
    this.page++;
  }

  getMoviesDetails(movies: Movies[]) {
    movies.forEach( movie => {
      this._listsService.getMovie(movie.imdb_id).subscribe( resp => {
        this.imdbMovies.push(resp.movie_results[0]);
        });
    });
  }
  onMovieClick( movie: MovieResult){
  this.router.navigate(['/movie', movie.id]);
  }

}
