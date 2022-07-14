import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  loggedIn(){
    let hasToken = false;
    if (localStorage.getItem('token') === 'prepucio'){
      hasToken = true;
    }
    return hasToken;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
