import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  public editResults: any;
  name: string;
  serial: string;
  spec: string;
  image: any = null;
  status = true;
  holder: string;

  options: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.editResults = {};
    this.createForm();
  }

  createForm() {
    this.options = this.formBuilder.group({
      name: '',
      serial: '',
      spec: '',
      image: '',
      status: '',
      holder: ''
    });
  }

}
