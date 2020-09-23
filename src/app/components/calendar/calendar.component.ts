import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTitleFormatter} from 'angular-calendar';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { DatePipe, DOCUMENT, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Swal from 'sweetalert2';

registerLocaleData(localeEsAr, 'es-Ar');

const colors: any = {
  red: {
    primary: '#dc143c',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#0000ff',
    secondary: '#D1E8FF',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})

export class CalendarComponent implements OnInit {

  @ViewChild('modalContentEdit', { static: true }) modalContentEdit: TemplateRef<any>;
  @ViewChild('modalContentAdd', { static: true }) modalContentAdd: TemplateRef<any>;
  @ViewChild('modalDelete', { static: true }) modalDelete: TemplateRef<any>;

  events: CalendarEvent[] = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: CalendarEvent;

  addForm: FormGroup;

  editForm: FormGroup;

  currentDay: Date;

  discordFlag: boolean;

  pipe = new DatePipe('es-Ar');

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor( private _eventsService: EventsService,
               private modal: NgbModal,
               @Inject(DOCUMENT) private document,
               private formBuilder: FormBuilder ) {
                }

  ngOnInit(): void {
   this.getEvents();
    }

  get titleNotValidAddForm() {
    return this.addForm.get('title').invalid && this.addForm.get('title').touched;
  }
  get dateNotValidAddForm() {
    return this.addForm.get('start').invalid && this.addForm.get('start').touched;
  }

  get titleNotValidEditForm() {
    return this.editForm.get('title').invalid && this.editForm.get('title').touched;
  }
  get dateNotValidEditForm() {
    return this.editForm.get('start').invalid && this.editForm.get('start').touched;
  }

  getEvents(){
    this._eventsService.getEvents()
      .subscribe( resp => {
        this.events = resp;
        this.events.forEach(event => {
          event.actions = this.actions;
        });
        this.refresh.next();
        });
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.currentDay = date;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = event;
    switch (action) {
      case 'Clicked':
        const date = this.pipe.transform(event.start, 'short');
        Swal.fire({
          title: event.title,
          html: date + '<br><br>' + event.description,
          backdrop: `
            rgba(0,0,123,0.4)
            url("./assets/img/wengweng.gif")
            right top
            no-repeat
          `,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Editar`,
          denyButtonText: `Borrar`,
          cancelButtonText: `Cancelar`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.handleEvent('Edited', event);
          } else if (result.isDenied) {
            this.handleEvent('Deleted', event);
          }
        });
        break;
      case 'Edited':
        this.createEditForm(this.modalData)
        this.modal.open(this.modalContentEdit, { size: 'lg', windowClass: 'dark-modal', centered: true  });
        break;
      case 'Deleted':
        Swal.fire({
          icon: 'warning',
          text: `Estás seguro que querés borrar el evento ${ event.title }?`,
          showConfirmButton: true,
          showCancelButton: true
        }).then( resp => {
          if (resp.value) {
            this._eventsService.deleteEvent( Number(event.id) ).subscribe();
            for (let index = 0; index < this.events.length; index++) {
              if (event.id === this.events[index].id) {
                this.events.splice(index, 1);
                break;
              }
            }
            this.refresh.next();
          }
        });
        break;
    }
  }

  createEditForm(modalData: CalendarEvent){
    this.editForm = this.formBuilder.group({
      title: [modalData.title, [ Validators.required, Validators.minLength(5) ] ],
      start: [ modalData.start, Validators.required],
      description: [modalData.description],
      discord: [modalData.discord],
      id: [modalData.id]
    });
    this.discordFlag = modalData.discord;
  }

  public saveEditedEvent() {
    const eventIndex = this.events.findIndex((obj => obj.id === this.editForm.value.id));
    // Probar pristine (el formulario no se tocó)
    // if (this.editForm.pristine)
    if (this.events[eventIndex].start !== this.editForm.value.start ||
        this.events[eventIndex].title !== this.editForm.value.title ||
        this.events[eventIndex].description !== this.editForm.value.description ||
        this.events[eventIndex].discord !== this.discordFlag) {
          this.editForm.value.discord = this.discordFlag;
          this.editForm.value.end = this.editForm.value.start;
          const eventForEdit: CalendarEvent = this.editForm.value;
          this._eventsService.editEvent(this.editForm.value.id, this.editForm.value)
            .subscribe();
          this.modal.dismissAll();
          eventForEdit.actions = this.actions;
          if (eventForEdit.discord) {
            eventForEdit.color = colors.blue;
          } else {
            eventForEdit.color = colors.red;
          }
          this.events[eventIndex] = eventForEdit;
          this.refresh.next();
    } else {
      this.modal.dismissAll();
    }
    this.editForm.value.discord = this.discordFlag;
    this.editForm.value.end = this.editForm.value.start;
    const eventForEdit: CalendarEvent = this.editForm.value;
    this._eventsService.editEvent(this.editForm.value.id, this.editForm.value)
      .subscribe();
    this.modal.dismissAll();
    eventForEdit.actions = this.actions;
    if (eventForEdit.discord) {
      eventForEdit.color = colors.blue;
    } else {
      eventForEdit.color = colors.red;
    }
    this.events[eventIndex] = eventForEdit;
    this.refresh.next();
  }

  addEvent( ): void {
    this.createAddForm();
    this.modal.open(this.modalContentAdd, { size: 'lg', windowClass: 'dark-modal', centered: true });
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.minLength(5) ] ],
      start: [ this.currentDay, Validators.required],
      description: [''],
      discord: [true]
    });
    this.discordFlag = this.addForm.value.discord;
  }

  saveNewEvent() {
    this.addForm.value.discord = this.discordFlag;
    this.addForm.value.end = this.addForm.value.start;
    const eventForAdd: CalendarEvent = this.addForm.value;
    this._eventsService.postEvent( this.addForm.value )
      .subscribe( resp => {
        eventForAdd.id = resp.id;
      }) ;
    this.modal.dismissAll();
    eventForAdd.actions = this.actions;
    if (eventForAdd.discord) {
      eventForAdd.color = colors.blue;
    } else {
      eventForAdd.color = colors.red;
    }
    this.events.push(eventForAdd);
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
