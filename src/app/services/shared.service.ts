import { Injectable } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public invalidField(field: AbstractControl) {
    return field && field.invalid && (field.dirty || field.touched);
  }

  public emptyField(field: AbstractControl) {
    return field && field.value === null && (field.dirty || field.touched);
  }

  public invalidFieldColor(field: AbstractControl) {
    return this.invalidField(field) ? "danger" : "";
  }
  
}
