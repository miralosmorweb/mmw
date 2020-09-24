import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ListsService, ListModel } from '../../services/lists.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {

  @ViewChild('modalAddList', { static: true }) modalContentAdd: TemplateRef<any>;

  newListForm: FormGroup;

  lists: ListModel[] = [];

  get nameNotValidAddForm() {
    return this.newListForm.get('name').invalid && this.newListForm.get('name').touched;
  }
  get descriptionNotValidAddForm() {
    return this.newListForm.get('description').invalid && this.newListForm.get('description').touched;
  }
  get linkNotValidAddForm() {
    return this.newListForm.get('link').invalid && this.newListForm.get('link').touched;
  }
  get byNotValidAddForm() {
    return this.newListForm.get('by').invalid && this.newListForm.get('by').touched;
  }
  get wordsNotValidAddForm() {
    return this.newListForm.get('words').invalid && this.newListForm.get('words').touched;
  }
  get imgNotValidAddForm() {
    return this.newListForm.get('img').invalid && this.newListForm.get('img').touched;
  }

  constructor(private _listsService: ListsService,
              private router: Router,
              private modal: NgbModal,
              private formBuilder: FormBuilder
              ) {}

  ngOnInit(): void {
    this._listsService.getLists()
      .subscribe( (resp) => this.lists = resp);
  }

  showList(idx:number){
    this.router.navigate(['/list', idx]);
  }

  newList(){
    this.createListForm();
    this.modal.open(this.modalContentAdd, { size: 'lg', windowClass: 'dark-modal', centered: true });
  }

  saveNewList(){
    this._listsService.addList(this.newListForm.value).subscribe();
    this.modal.dismissAll();
    this.lists.push(this.newListForm.value);
  }

  createListForm(){
    this.newListForm = this.formBuilder.group({
      name: ['', [ Validators.required ] ],
      description: ['', [ Validators.required ] ],
      link: ['', [ Validators.required ] ],
      img: ['', [ Validators.required ] ],
      by: ['', [ Validators.required ] ],
      words: ['', [ Validators.required ] ]
      });
  }
}
