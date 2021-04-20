import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oscalo',
  templateUrl: './oscalo.component.html'
})
export class OscaloComponent implements OnInit {

  notClicked = true;
  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document
              ) {}

  ngOnInit(): void {
  }

  clickedLink() {

    this.notClicked = false;

    setTimeout (() => {

      document.location.href = 'https://forms.gle/Pg64dxLZyND23SJZA ';


    }, 5000);

    // https://forms.gle/Pg64dxLZyND23SJZA
    
  }

}
