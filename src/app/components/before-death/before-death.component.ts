import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeforeDeathService } from 'src/app/services/before-death.service';
import { ListsService } from 'src/app/services/lists.service';
import { SharedService } from 'src/app/services/shared.service';
import { BeforeDeathList, BeforeDeathMovie, BeforeDeathMovieInfo, MovieResult } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-before-death',
  templateUrl: './before-death.component.html',
  styleUrls: ['./before-death.component.scss']
})
export class BeforeDeathComponent implements OnInit {

  public step = 0;
  public view: 'start' | 'myList' | 'generalList' = 'generalList'; 
  public loading = false;
  public firstMovie: MovieResult;
  public movies: MovieResult [] = [];
  public generalList: BeforeDeathMovie[] = []; 
  public moviesForm = this.fb.group({
    name: ['', [ Validators.required ] ],
    email: ['', { validators: [ Validators.required, Validators.email ],  asyncValidators: [this.beforeDeathService.emailAlreadyRegistered]} ],
    movie: [''],
  });
    
  public myListForm = this.fb.group({
    email: ['', { validators: [ Validators.required, Validators.email ]} ],
    movies: [''],
  });

  private moviesImdbIds: string[] = [];
  private page = 1;
  private generalListInfo: BeforeDeathMovieInfo[] = [];

  constructor(
    private fb: FormBuilder,
    private beforeDeathService: BeforeDeathService,
    private sharedService: SharedService,
    private listsService: ListsService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.spinner.show(); 

    this.beforeDeathService.getGeneralList().subscribe(resp => {
      this.generalListInfo = resp;
      this.goToGeneralList();
      this.loading = false;
      this.spinner.hide();
    });
  }

  get emailNotValid() {
    return this.moviesForm.get('email').invalid && this.moviesForm.get('email').touched;
  }

  get emailValid() {
    return this.moviesForm.get('email').valid && this.moviesForm.get('email').touched;
  }

  get nameNotValid() {
    return this.moviesForm.get('name').invalid && this.moviesForm.get('name').touched;
  }

  get nameValid() {
    return this.moviesForm.get('name').valid && this.moviesForm.get('name').touched;
  }

  public get emailErrorMessage():string{
    if(this.moviesForm.get('email').hasError('email')) return 'Eso no es un mail';
    if(this.moviesForm.get('email').touched && this.moviesForm.get('email').hasError('required')) return 'Poneme un mail o no entrás.';
    if(this.moviesForm.get('email').touched && this.beforeDeathService.emailValid(this.moviesForm.get('email').value) && this.moviesForm.get('email').errors.emailExists) return '¿Cuantas veces querés participar cara de nalga?';
    return ' ';
  }

  public invalidField(field:AbstractControl){  
    return this.sharedService.invalidField(field);
  }

  public invalidFieldColor(field:AbstractControl){
    return this.sharedService.invalidFieldColor(field);
  }

  searchMovie() {
    if (this.moviesForm.get('movie').value.length) {
      let imdbID = this.moviesForm.get('movie').value;
      if (imdbID.slice(0,2) !== 'tt') {
        imdbID = imdbID.substring(imdbID.lastIndexOf('title/tt') + 6);
        imdbID = imdbID.split('/')[0];
      }
      if (this.moviesImdbIds.includes(imdbID)) {
        Swal.fire({
          title: 'ERROR FATAL',
          icon: 'error',
          text: 'Esta computadora se autodestruirá en 5, 4, 3, 2... Bueno, no, solo que esa película ya la pusiste pastel.',
          showConfirmButton: true,
          showCancelButton: false
        });
        return;
      }
      
      this.listsService.getMovie(imdbID).subscribe( resp => {
        console.log(resp);
        if (!resp.movie_results.length) {
          Swal.fire({
            title: 'No pudimos encontrar la película',
            text: 'Asegurate de ingresar bien la URL o el ID de IMDB e intenta nuevamente. Si aún no funciona comunicate con el equipo de Haití y te responderemos cuando se nos cante el upite.',
            showConfirmButton: true,
            showCancelButton: false
          });
        } else {
          this.movies.push(resp.movie_results[0]);
          
          this.moviesImdbIds.push(imdbID);
          
          this.moviesForm.get('movie').setValue('');
        }
      });       
    }
  }

  next() {    
    if (this.step === 0) {
      if (new Date() > new Date(2022, 4, 31)) {
        Swal.fire({
          title: 'TARDE!',
          text: 'Había tiempo hasta el 31/05, ahora jodete.',
          imageUrl: './assets/img/karina.jpg' ,
          imageAlt: 'karinaolga',
          showConfirmButton: false,
          showCancelButton: true
        });
        return;
      }
      this.step = 1;
      return; 
    } else if (this.step === 1) {
      this.router.navigate(['/home']);
    }    
  }

  goToMyList() {
    this.view = 'myList';
  }

  submitMyList() {

  }

  async goToGeneralList() {
    this.fillMoviesWithInfo(this.generalListInfo.slice(0, 20));
  }

  async fillMoviesWithInfo(movies: BeforeDeathMovieInfo[]) {
    this.loading = true;
    this.spinner.show(); 
    movies.forEach( item => {

      const movie: BeforeDeathMovie = {
        imdb_id: item.imdb_id,
        score: item.points,
        ranking: item.rank,
      }
      this.listsService.getMovie(item.imdb_id).subscribe(resp => {
        movie.details = resp.movie_results[0];
      });

      const firstChoices = [];
      const otherChoices = [];
      if (!!item.mentions_first.length) {
        item.mentions_first.forEach(mention => {
          firstChoices.push({
            user: mention.name,
            review: item.review.find(review => review.autor.mail === mention.mail) ? item.review.find(review => review.autor.mail === mention.mail).text : null
          });
        });
      }
      if (!!item.mentions_other.length) {
        item.mentions_other.forEach(mention => {
          otherChoices.push({
            user: mention.name,
            review: item.review.find(review => review.autor.mail === mention.mail) ? item.review.find(review => review.autor.mail === mention.mail).text : null
          });
        });
      }

      movie.usersFirstChoice = firstChoices;
      movie.usersOtherChoice = otherChoices
      
      this.generalList.push(movie);
    });

    console.log('movies');
    console.log(this.generalList);
    this.loading = false;
    this.spinner.hide();
  }

  onScrollDown() {
    this.fillMoviesWithInfo(this.generalListInfo.slice(this.page * 20, (this.page * 20) + 20));
    this.page++;
  }

  async submit() {
    if (!this.moviesForm.valid || !this.movies.length || this.movies.length >= 21) {
      return;
    }
    Swal.fire({
      icon: 'warning',
      html: '¿Estás segurx de que lo querés enviar?' + 
            '<br><br><small style="color: black">¿Tenés miedo de olvidarte de tu lista? Deal with it, todos los integrantes (portadores de pene) del departamento de Haití están ocupados practicandose auto-felatios.</small>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'No, yo soy muy cagón'
    }).then(resp => {
      if (resp.value) {
        
        const req: BeforeDeathList = {
          email: this.moviesForm.get('email').value,
          name: this.moviesForm.get('name').value,
          selectedOptions: this.moviesImdbIds.join(',')
        }

        console.log('a enviar');
        console.log(req);
        
        this.beforeDeathService.sendMovies(req).subscribe(resp => {
          Swal.fire({
            title: 'Tu lista se guardó correctamente!',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: false
          }).then(resp => 
            {if (resp.value) {
              this.next();
            }});
        });
      }
    });
  }
  
  onMovieClick(movie: BeforeDeathMovie){
    this.router.navigate(['/movie', movie.details.id], { state: {reviews: movie.usersFirstChoice.concat(movie.usersOtherChoice)}});
  }
}
