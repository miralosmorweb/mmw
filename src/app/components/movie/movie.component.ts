import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../services/lists.service';
import { Location } from '@angular/common' ;
import { Cast, Crew, MovieDetail } from 'src/app/shared/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie: MovieDetail;
  public cast: Cast[] = [];
  public genres: string;
  public directedBy: string;
  public writing: string;
  public reviews: {
    user: string,
    review: string
  }[] = [];
  public hasReviews = false;

  private crew: Crew[] = [];
  
  constructor( private activatedRoute: ActivatedRoute,
               private _listsService: ListsService,
               private location: Location,
               private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    const id = this.activatedRoute.snapshot.params.id;

    const movieReviews = history.state.reviews;
    
    // this.hasReviews = movieReviews.find( movie => movie.review !== null);

    if (movieReviews && !!movieReviews.length && !!movieReviews.find( movie => movie.review !== null )) {
      this.reviews = movieReviews;
    }
    
    // revisar, salen los nombres de users sin reviews. 
    
    console.log('movieReviews');
    console.log(movieReviews);
    
    await this._listsService.getMovieDetail( id ).subscribe( movie => {
      this.movie = movie;
      this.genres = movie.genres.map( genre => genre.name ).join(', ');
    });
    await this._listsService.getCastAndCrew( id ).subscribe( credits => {
      this.cast = credits.cast;
      this.crew = credits.crew;
      this.directedBy = this.crew.filter(crewMember => crewMember.job === 'Director').map(director => director.name).join(', ');
      this.writing = this.crew.filter(crewMember => crewMember.job === 'Screenplay' || crewMember.job === 'Writer').map(writer => writer.name).join(', ');     
      this.spinner.hide();
    });
  }

  goBack(){
    this.location.back();

  }

}
