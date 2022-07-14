import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public password = new FormControl('');
  public isInvalid = false;
  private allowedPassword = 'prepucio';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.password.value === this.allowedPassword) {
      console.log('success');
      localStorage.setItem('token', this.allowedPassword);
      this.router.navigate(['/home']);      
    } else {
      this.isInvalid = true;
    }
  }

  validField() {
    return this.password.touched && this.password.value.length > 0;
  }

}
