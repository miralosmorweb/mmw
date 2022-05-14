import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailCheckResponse, ValidationResult, BeforeDeathList, BeforeDeathListWithMovies } from '../shared/interfaces';
import { ListsService } from './lists.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeDeathService {

  private url = 'https://cahbot.pythonanywhere.com/api/mam/';

  constructor(private http: HttpClient,
    private listsService: ListsService) { }

  public emailValid(email: string) {
    const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    return email.match(EMAIL_REGEXP);
  }

  public emailAlreadyRegistered: AsyncValidatorFn = (control: AbstractControl) => {
    return this.checkEmailRegistered(control.value)
    .pipe(
      map(response => response.exists ? { emailExists: true } : null)
    );
  }

  private checkEmailRegistered(email: string): Observable<EmailCheckResponse> {
    return this.http.post<EmailCheckResponse>(`${ this.url }check`, { email });
  }

  public sendMovies(beforeDeathList: BeforeDeathList) {
    return this.http.post<any>(`${ this.url }newmam`, beforeDeathList) 
  } 

  public async getLists() {
    const moviesLists: BeforeDeathListWithMovies[] = [];
    const subs = await this.http.get<BeforeDeathList[]>(`${ this.url }check`);
    subs.subscribe( lists => {
      lists.forEach( list => {
        const newList: BeforeDeathListWithMovies = {
          name: list.name,
          email: list.email,
          movies: []
        }

        const moviesIds = list.selectedOptions.split(',');
        
        moviesIds.forEach(id => {
          this.listsService.getMovieEn(id).subscribe( resp => {
            newList.movies.push(resp.movie_results[0].title + ' - ' + resp.movie_results[0].original_title);
          });      
        });

        moviesLists.push(newList);
      });
    });
    return moviesLists;
  }
}
