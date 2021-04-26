import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oscalo',
  templateUrl: './oscalo.component.html'
})
export class OscaloComponent implements OnInit {

  notClicked = true;
  result: 'winner' | 'loser' | 'notFound';
  loading = false;
  showGif = false;
  showMessageToGif = false;

  losers = ['PePo', 'EvilIpa', 'Santi (del discord)', 'Martín Brest', 'Carlos Galan', 'noelyas', 'Juan Andrés Navarro', 'Yani', 'Edgardo Reglin', 'Giselle', 
    '@jmcartelle', 'Martin Alzueta', 'Sebastian (con camara)', '@princesscarolyn78', 'Maxi', 'Fede C', 'Fernando Stefanelli', 'Carla', 'dunno555', 'Gary Busy', 
    'Nico LP', 'Magali Collante', 'Sebastian (con barba)', 'Ale', 'Marcela M', 'Agusli', 'Lavtaro', '@hitoshidiaz', 'Lailu', '@Anitabasto', 'Hernán Rodriguez' ,
    'Mauro El Picaro', 'Lisandro Ozafrain', 'Camilo C', 'Mark II', 'Juanno', 'El_Diegot3', 'Juan', 'Daniel Rodriguez', 'CALO', 'Nico Annia', 'Gus', '@70ldo',
    'Marcelo Martínez', 'Albano Spagnoletti', 'Gon Sarno', 'Guille', 'Pablo', 'Eugenin', 'Guille Giova', '@catalanojoaquin', 'Santi', 'Claudio', 
    'Julianpaty95', 'Javier Covian', 'Matias Lepori', '@maragxzmxn', 'Nadia', 'Silvina', 'Mar', 'Carolina', 'Beorn The Bear', 'Joia Nunez'
    ];

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document
              ) {}

  ngOnInit(): void {
  }

  searchName(text) {
    console.log(text);
    
    this.notClicked = false;
    this.loading = true;
    setTimeout (() => {
      this.result = 'notFound';
      if (text.toLowerCase() === 'francisco requejo')
      {
        this.result = 'winner';
      }
      else {
        for(let loser in this.losers) {
          if (this.losers[loser].toLowerCase() === text.toLowerCase()) {
            this.result = 'loser';
            break;
          }
        };
      }
      this.loading = false;
      if (this.result === 'loser') {
        setTimeout(() => {
          this.showMessageToGif = true;
        }, 2500);
        setTimeout(() => {
          this.showMessageToGif = false;
          this.showGif = true;
        }, 5000);
      }
    }, 3000);

  }

  refresh(): void {
    window.location.reload();
}

  clickedLink() {

    this.notClicked = false;

    setTimeout (() => {

      document.location.href = 'https://forms.gle/Pg64dxLZyND23SJZA ';


    }, 5000);

    // https://forms.gle/Pg64dxLZyND23SJZA
    
  }

}
