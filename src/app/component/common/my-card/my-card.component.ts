import { Component, OnInit, Input } from '@angular/core';
import { MacinoddsApiService } from '../../../service/macinodds-api.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent implements OnInit {

  modalForm: FormGroup;

  userId = localStorage.getItem('userId');
  returnDate: any;
  returnMemo: string;
  returnLocation: string;
  vaildatBT = false;



  @Input() 
  dataObject: any = {
    name: '',
    serial:'',
    spec: '',
    returnDate: '',
    img: ''
  };




  constructor(
    private macApiService: MacinoddsApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.returnDate = new Date(this.dataObject.returnDate).toLocaleDateString("pt-PT");
    console.log(this.dataObject)
  }

  private createForm() {
    this.modalForm = this.formBuilder.group({
      memo: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

 


}
