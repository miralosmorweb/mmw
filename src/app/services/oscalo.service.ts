import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailCheckResponse, ValidationResult, Vote } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OscaloService {

  private invalidEmails = [
    'antonmartinezq@gmail.com',
    'mail@a.com'
  ]
  private url = 'https://cahbot.pythonanywhere.com/api/oscalo/';

  constructor(private http: HttpClient) { }

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

  public newVote(vote: Vote) {
    return this.http.post<any>(`${ this.url }newoscalo`, vote) 
  } 
}

