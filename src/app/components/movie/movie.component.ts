import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../services/lists.service';
import { Location } from '@angular/common' ;
import { Cast, MovieDetail } from 'src/app/shared/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie: MovieDetail;
  cast: Cast[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private _listsService: ListsService,
               private location: Location,
               private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    const id = this.activatedRoute.snapshot.params.id;
    await this._listsService.getMovieDetail( id ).subscribe( movie => {
      this.movie = movie;
    });
    await this._listsService.getCast( id ).subscribe( cast => {
      this.cast = cast;
      this.spinner.hide();
    });
  }

  goBack(){
    this.location.back();

  }

}
