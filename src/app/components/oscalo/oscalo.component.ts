import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { OscaloService } from 'src/app/services/oscalo.service';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vote } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-oscalo',
  templateUrl: './oscalo.component.html',
  styleUrls: ['./oscalo.component.scss']
})
export class OscaloComponent implements OnInit {

  @ViewChild('termsModal', { static: true }) termsModal: TemplateRef<any>;

  wantToJoin = false;
  result: 'winner' | 'loser' | 'notFound';
  loading = false;
  showGif = false;
  showMessageToGif = false;
  exportableSelection = [];
  joinClickCounter = 0;

  public oscarsForm = this.fb.group({
    name: ['', [ Validators.required ] ],
    email: ['', { validators: [ Validators.required, Validators.email ],  asyncValidators: [this.oscaloService.emailAlreadyRegistered]} ],
    movie: ['', [ Validators.required ] ],
    directing: ['', [ Validators.required ] ],
    actor: ['', [ Validators.required ] ],
    supportingActor: ['', [ Validators.required ] ],
    actress: ['', [ Validators.required ] ],
    supportingActress: ['', [ Validators.required ] ],
    cinematography: ['', [ Validators.required ] ],
    costumeDesign: ['', [ Validators.required ] ],
    documentary: ['', [ Validators.required ] ],
    shortDocumentary: ['', [ Validators.required ] ],
    filmEditing: ['', [ Validators.required ] ],
    internationalFilm: ['', [ Validators.required ] ],
    makeupAndHair: ['', [ Validators.required ] ],
    originalScore: ['', [ Validators.required ] ],
    originalSong: ['', [ Validators.required ] ],
    productionDesign: ['', [ Validators.required ] ],
    animatedFilm: ['', [ Validators.required ] ],
    shortAnimated: ['', [ Validators.required ] ],
    shortFilm: ['', [ Validators.required ] ],
    sound: ['', [ Validators.required ] ],
    visualEffects: ['', [ Validators.required ] ],
    adaptedScreenplay: ['', [ Validators.required ] ],
    originalScreenplay: ['', [ Validators.required ] ],
    });

  public nominees = {
    movie: {
      label: 'Mejor película', 
      options: [
      {id: 'tt12789558', name: "Belfast"},
      {id: 'tt10366460', name: "CODA"},
      {id: 'tt14039582', name: "Drive My Car"},
      {id: 'tt1160419', name: "Dune"},
      {id: 'tt7740496', name: "Nightmare Alley"},
      {id: 'tt9620288', name: "King Richard"},
      {id: 'tt10293406', name: "The Power of the Dog"},
      {id: 'tt11271038', name: "Licorice Pizza"},
      {id: 'tt11286314', name: "Don't Look Up"},
      {id: 'tt3581652', name: "West Side Story"}
    ]},
    directing: {
      label: 'Mejor director/a',
      options: [
        {id: 'nm0001005 - tt10293406', name: "Jane Campion", movie: 'The Power of the Dog'},
        {id: 'nm0000110 - tt12789558', name: "Kenneth Branagh", movie: 'Belfast'},
        {id: 'nm0000759 - tt11271038', name: "Paul Thomas Anderson", movie: 'Licorice Pizza'},
        {id: 'nm3152327 - tt14039582', name: "Ryûsuke Hamaguchi", movie: 'Drive My Car'},
        {id: 'nm0000229 - tt3581652', name: "Steven Spielberg", movie: 'West Side Story'}
    ]},
    actor: {
      label: 'Mejor Actor',
      options: [
        {id: 'nm1940449 - tt8721424', name: "Andrew Garfield", movie: 'tick, tick... Boom!'},
        {id: 'nm1212722 - tt10293406', name: "Benedict Cumberbatch" , movie: 'The Power of the Dog'},
        {id: 'nm0000243 - tt10095582', name: "Denzel Washington", movie: 'The Tragedy of Macbeth'},
        {id: 'nm0000849 - tt4995540', name: "Javier ''minoría'' Bardem", movie: 'Being the Ricardos'},
        {id: 'nm0000226 - tt9620288', name: "Will Smith", movie: 'King Richard'}
    ]},
    supportingActor: {
      label: 'Mejor Actor Secundario',
      options: [
        {id: 'nm0001354 - tt12789558', name: "Ciarán Hinds", movie: 'Belfast'},
        {id: 'nm0799777 - tt4995540', name: "J.K. Simmons", movie: 'Being the Ricardos'},
        {id: 'nm0687146 - tt10293406', name: "Fatt Damon", movie: 'The Power of the Dog'},
        {id: 'nm2240346 - tt10293406', name: "Kodi Smit-McPhee", movie: 'The Power of the Dog'},
        {id: 'nm1319274 - tt10366460', name: "Troy Kotsur (y este quién e'?)", movie: ' CODA'}
    ]},
    actress: {
      label: 'Mejor actriz',
      options: [
        {id: 'nm1567113 - tt9115530', name: "Jessica Chastain", movie: 'The Eyes of Tammy Faye'},
        {id: 'nm0829576 - tt12536294', name: "Kristen Stewart", movie: 'Spencer'},
        {id: 'nm0000173 - tt4995540', name: "Nicole Kidman", movie: 'Being the Ricardos'},
        {id: 'nm1469236 - tt9100054', name: "Olivia Colman", movie: 'The Lost Daughter'},
        {id: 'nm0004851 - tt12618926', name: "Penélope Cruz (le doy hasta que gane el Óscar Benedetta)", movie: 'Madres Paralelas'}
    ]},
    supportingActress: {
      label: 'Mejor actriz secundaria',
      options: [
        {id: 'nm3663196 - tt3581652', name: "Ariana DeBose", movie: 'West Side Story'},
        {id: 'nm0254712 - tt9620288', name: "Aunjanue Ellis", movie: 'King Richard'},
        {id: 'nm2976580 - tt9100054', name: "Jessie Buckley", movie: 'The Lost Daughter'},
        {id: 'nm0001132 - tt12789558', name: "Judi Dench", movie: 'Belfast'},
        {id: 'nm0000379 - tt10293406', name: "Kirsten Dunst", movie: 'The Power of the Dog'}
    ]},
    cinematography: {
      label: 'Fotografía',
      options: [
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt7740496', name: "Nightmare Alley"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt10095582', name: "The Tragedy of Macbeth"},
        {id: 'tt3581652', name: "West Side Story"},
    ]},
    costumeDesign: {
      label: 'Vestiditos y disfraces',
      options: [
        {id: 'tt3228774', name: "Cruella"},
        {id: 'tt12889404', name: "Cyrano, la del enano, agarramela con la mano"},
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt7740496', name: "Nightmare Alley"},
        {id: 'tt3581652', name: "West Side Story"},
    ]},
    documentary: {
      label: 'Mejor documental',
      options: [
        {id: 'tt14505430', name: "Ascension"},
        {id: 'tt12482898', name: "Attica"},
        {id: 'tt8430054', name: "Flee"},
        {id: 'tt11422728', name: "Summer of Soul"},
        {id: 'tt13630174', name: "Writing with Fire"},
    ]},
    shortDocumentary:{
      label: 'Mejor corto documental',
      options: [
        {id: 'tt12771540', name: "Audible"},
        {id: 'tt13796488', name: "When We Were Bullies"},
        {id: 'tt15339848', name: "Lead Me Home"},
        {id: 'tt14513236', name: "The Queen of Basketball"},
        {id: 'tt14608922', name: "Three Songs for Benazir"},
    ]},
    filmEditing: {
      label: 'Montaje',
      options: [
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt9620288', name: "King Richard"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt11286314', name: "Don't Look Up"},
        {id: 'tt8721424', name: "tick, tick...BOOM!"},
    ]},
    internationalFilm: {
      label: 'Mejor Película extranjera',
      options: [
        {id: 'tt14039582', name: "Drive My Car"},
        {id: 'tt8430054', name: "Flee"},
        {id: 'tt12680684', name: "È stata la mano di Dio FUAELDIEGO"},
        {id: 'tt10370710', name: "The Worst Person in the World"},
        {id: 'tt10189300', name: "Lunana: A Yak in the Classroom"}
    ]},
    makeupAndHair: {
      label: 'Maquillaje y pelito',
      options: [
        {id: 'tt3228774', name: "Cruella"},
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt6802400', name: "Coming 2 America"},
        {id: 'tt11214590', name: "Ya tengo los huevos lacios con House of Gucci"},
        {id: 'tt9115530', name: "The Eyes of Tammy Faye"},
    ]},
    originalScore: {
      label: 'Mejor banda sonora original',
      options: [
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt2953050', name: "Encanto"},
        {id: 'tt12618926', name: "Madres Paralelas"},
        {id: 'tt11286314', name: "Don't Look Up"},
    ]},
    originalSong: {
      label: 'Mejor canción original',
      options: [
        {id: 'tt10344522', name: "Four Good Days"},
        {id: 'tt12789558', name: "Belfast"},
        {id: 'tt9620288', name: "King Richard"},
        {id: 'tt2953050', name: "Encanto"},
        {id: 'tt2382320', name: "No Time to Die"}
    ]},
    productionDesign: {
      label: 'Diseño de producción',
      options: [
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt7740496', name: "Nightmare Alley"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt10095582', name: "The Tragedy of Macbeth"},
        {id: 'tt3581652', name: "West Side Story"},
    ]},
    animatedFilm: {
      label: 'Mejor película animada',
      options: [
        {id: 'tt2953050', name: "How yankees imagine Colombia"},
        {id: 'tt8430054', name: "Flee"},
        {id: 'tt7979580', name: "The Mitchells vs the Machines"},
        {id: 'tt12801262', name: "Luca"},
        {id: 'tt5109280', name: "Raya and the Last Dragon"},
    ]},
    shortAnimated: {
      label: 'Mejor corto animado',
      options: [
        {id: 'tt14293560', name: "Affairs of the Art"},
        {id: 'tt14825950', name: "Bestia"},
        {id: 'tt14825972', name: "Boxballet"},
        {id: 'tt11332850', name: "Robin Robin"},
        {id: 'tt9464038', name: "The Windshield Wiper"},
    ]},
    shortFilm: {
      label: 'Mejor corto',
      options: [
        {id: 'tt7914938', name: "Ala Kachuu JAJAJAJAJAJAJA"},
        {id: 'tt15289736', name: "On my Mind"},
        {id: 'tt11383280', name: "Please Hold"},
        {id: 'tt12299764', name: "Sukienka (The Dress)"},
        {id: 'tt11924384', name: "The Long Goodbye"},
    ]},
    sound: {
      label: 'Sonido',
      options: [
        {id: 'tt12789558', name: "Belfast"},
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt2382320', name: "No Time to Die"},
        {id: 'tt3581652', name: "West Side Story"}
    ]},
    visualEffects: {
      label: 'Efectos especiales',
      options: [
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt6264654', name: "Free Guy"},
        {id: 'tt9376612', name: "Chanchín y la leyenda de Supermerk2"},
        {id: 'tt2382320', name: "No Time to Die"},
        {id: 'tt10872600', name: "Spider-Man: No Way Home"}
    ]},
    adaptedScreenplay: {
      label: 'Guión adaptado',
      options: [
        {id: 'tt10366460', name: "CODA"},
        {id: 'tt14039582', name: "Drive My Car"},
        {id: 'tt1160419', name: "Dune"},
        {id: 'tt10293406', name: "The Power of the Dog"},
        {id: 'tt9100054', name: "The Lost Daughter"}
    ]},
    originalScreenplay: {
      label: 'Guión original',
      options: [
        {id: 'tt12789558', name: "Belfast"},
        {id: 'tt9620288', name: "King Richard"},
        {id: 'tt10370710', name: "The Worst Person in the World"},
        {id: 'tt11271038', name: "Licorice Pizza"},
        {id: 'tt11286314', name: "Don't Look Up"},
    ]}
  }

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private fb: FormBuilder,
              private oscaloService: OscaloService,
              private sharedService: SharedService,
              private modal: NgbModal
              ) {}

  ngOnInit(): void {
    
  }
  ngOnDestroy() {
  }

  get emailNotValid() {
    return this.oscarsForm.get('email').invalid && this.oscarsForm.get('email').touched;
  }

  get emailValid() {
    return this.oscarsForm.get('email').valid && this.oscarsForm.get('email').touched;
  }

  get nameNotValid() {
    return this.oscarsForm.get('name').invalid && this.oscarsForm.get('name').touched;
  }

  get nameValid() {
    return this.oscarsForm.get('name').valid && this.oscarsForm.get('name').touched;
  }

  public get emailErrorMessage():string{
    if(this.oscarsForm.get('email').hasError('email')) return 'Eso no es un mail';
    if(this.oscarsForm.get('email').touched && this.oscarsForm.get('email').hasError('required')) return 'Poneme un mail, no te vamos a hackear nada';

    if(this.oscarsForm.get('email').touched && this.oscaloService.emailValid(this.oscarsForm.get('email').value) && this.oscarsForm.get('email').errors.emailExists) return 'Cuantas veces querés participar la concha de tu madre?';
    return ' ';
  }

  public invalidField(field:AbstractControl){  
    return this.sharedService.invalidField(field);
  }

  public invalidFieldColor(field:AbstractControl){
    return this.sharedService.invalidFieldColor(field);
  }

  refresh(): void {
    window.location.reload();
  }

  openTermsModal() {
    this.modal.open(this.termsModal, { size: 'lg', windowClass: 'dark-modal', centered: true  });
  }

  join() {    
    if (this.joinClickCounter === 0) {
      this.joinClickCounter = 1;
      return; 
    }
    if (new Date() >= new Date(2022, 3, 28)) {
      Swal.fire({
        title: 'Dormiste',
        text: 'Como Karina Olga, llegaste tarde a votar',
        imageUrl: './assets/img/karina.jpg' ,
        imageAlt: 'karinaolga',
        showConfirmButton: false,
        showCancelButton: true
      });
      return;
    }
    this.wantToJoin = true;
  }

  async submitSelection() {
    Swal.fire({
      text: 'Estás segurx de que lo querés enviar? Mirá que no se puede editar eh! Bueno, yo avisé.\nTenés miedo de olvidarte lo que votaste y te caguemos? Tranquilx, se te va a descargar un PDF bonito con lo que votaste.',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        console.log('this.oscarsForm.value');
        console.log(this.oscarsForm.value);
        this.oscarsForm.markAllAsTouched();
        if (!this.oscarsForm.valid) return;
    
        const selectedOptions: string = this.oscarsForm.get('movie').value + ',' + this.oscarsForm.get('directing').value + ','
          + this.oscarsForm.get('actor').value + ',' + this.oscarsForm.get('supportingActor').value + ','
          + this.oscarsForm.get('actress').value + ',' + this.oscarsForm.get('supportingActress').value + ','
          + this.oscarsForm.get('cinematography').value + ',' + this.oscarsForm.get('costumeDesign').value + ','
          + this.oscarsForm.get('documentary').value + ',' + this.oscarsForm.get('shortDocumentary').value + ','
          + this.oscarsForm.get('filmEditing').value + ',' + this.oscarsForm.get('internationalFilm').value + ','
          + this.oscarsForm.get('makeupAndHair').value + ',' + this.oscarsForm.get('originalScore').value + ','
          + this.oscarsForm.get('originalSong').value + ',' + this.oscarsForm.get('productionDesign').value + ','
          + this.oscarsForm.get('animatedFilm').value + ',' + this.oscarsForm.get('shortAnimated').value + ',' 
          + this.oscarsForm.get('shortFilm').value + ',' + this.oscarsForm.get('sound').value + ',' 
          + this.oscarsForm.get('visualEffects').value + ',' + this.oscarsForm.get('adaptedScreenplay').value + ',' + this.oscarsForm.get('originalScreenplay').value;
    
        const req : Vote = {
          email: this.oscarsForm.get('email').value,
          name: this.oscarsForm.get('name').value,
          selectedOptions
        }

        this.oscaloService.newVote(req).subscribe(resp => {
          if (resp.id) {
            this.generatePdf();
          }
        });
      }
    });
  }

  async generatePdf() {

    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();

    pdf.add( await new Img('./assets/img/oscalo.jpg').width(200).alignment('center').build());
    pdf.add('\n');
    pdf.add(new Txt('Gracias por participar del Prode de los Oscalos!').bold().fontSize(16).end);
    pdf.add('Guardate este archivo para corroborar tus elecciones, si encontrás algún problema comunicate con la mesa de ayuda que no te va a atender nadie');

    pdf.add('\n\n');
    pdf.add(`${this.oscarsForm.get('name').value} - ${this.oscarsForm.get('email').value}`);
    pdf.add('\n');
    for (let key in this.nominees) {
      console.log('----------------------------------------');
      console.log(this.nominees[key].options.find(option => option.id === this.oscarsForm.get(key.toString()).value).name);
      
      this.exportableSelection.push({
        label: this.nominees[key].label,
        selection: this.nominees[key].options.find(option => option.id === this.oscarsForm.get(key.toString()).value).name
      })
      pdf.add(`${this.nominees[key].label}: ${this.nominees[key].options.find(option => option.id === this.oscarsForm.get(key.toString()).value).name}`);
    }

    pdf.create().download();

  }

  clickedLink() {


    setTimeout (() => {

      document.location.href = 'https://forms.gle/Pg64dxLZyND23SJZA ';

    }, 5000);

    // https://forms.gle/Pg64dxLZyND23SJZA
    
  }

}
