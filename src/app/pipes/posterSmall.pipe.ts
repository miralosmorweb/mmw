import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posterSmall'
})
export class PosterSmallPipe implements PipeTransform {

  transform( poster: string): string {
    if (poster) {
      return `https://image.tmdb.org/t/p/w185/${ poster }`;
    } else {
      return './assets/img/no-image.jpg';
    }
  }

}
