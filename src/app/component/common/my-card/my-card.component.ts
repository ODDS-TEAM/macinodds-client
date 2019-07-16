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
  result: any;
  hideCard = false;
  borrowDate: any;
  returnDate: any;
  returnMemo: string;
  returnLocation: string;
  pathImg: string;
  vaildatBT = false;


  backupData: any = {
    memo: '',
    location: ''
  };

  data: any = {
    memo: '',
    location: ''

  };


  constructor(
    private macApiService: MacinoddsApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.test();
    this.createForm();
  }

  private createForm() {
    this.modalForm = this.formBuilder.group({
      memo: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  test() {
    if (localStorage.getItem('role') === 'admin') {
      this.hideCard = true;
      this.result = {};
      this.pathImg = '';
    } else {
      this.macApiService.getData(this.userId).subscribe(data => {
        this.result = data;
        if (this.result.status) {
          this.hideCard = true;
          this.result = {};
          this.pathImg = '';

        } else {
          this.borrowDate = new Date(this.result.borrowDate).toLocaleDateString("pt-PT");
          this.returnDate = new Date(this.result.returnDate).toLocaleDateString("pt-PT");
          this.pathImg = 'http://139.5.146.213/assets/imgs/devices/' + this.result.img
        }
      });
      this.result = {};
    }
  }

  validatorMemo() {
    this.data.memo !== this.backupData.name ? this.vaildatBT = true : this.vaildatBT = false;
  }

  validatorLocation() {
    this.data.memo !== this.backupData.name ? this.vaildatBT = true : this.vaildatBT = false;
  }

}
