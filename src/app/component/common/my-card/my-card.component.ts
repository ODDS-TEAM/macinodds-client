import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DeviceApiService } from 'src/app/service/device-api.service';
import { Token } from 'src/app/shared/token';
import * as JWT from 'jwt-decode';
import { CheckRoleTokenService } from 'src/app/service/check-role-token.service';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent implements OnInit {

  modalForm: FormGroup;
  returnDate: any;
  returnMemo: string;
  returnLocation: string;
  show: boolean = false;

  @Output() toParentEvent = new EventEmitter();

  dataObject: any = {
    _id: '',
    name: '',
    serial: '',
    spec: '',
    returnDate: '',
    img: ''
  };

  constructor(
    private macApiService: DeviceApiService,
    private formBuilder: FormBuilder,
    private checkRoleToken: CheckRoleTokenService
  ) { }

  ngOnInit() {
    if (this.checkRoleToken.checkRoleByToken() === 'individual') {
      this.macApiService.getMyDevice().subscribe(res => {
        this.dataObject = res[0];
        this.returnDate = new Date(this.dataObject.returnDate).toLocaleDateString('pt-PT');
        if (this.dataObject)
          this.show = true;
      })
    }
    this.createForm();
  }

  private createForm() {
    this.modalForm = this.formBuilder.group({
      memo: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmitReturn() {
    const object: any = {
      memo: this.returnMemo,
      location: this.returnLocation
    }
    // post method
    this.macApiService.postReturn(this.dataObject._id, JSON.stringify(object))
      .subscribe(result => {
        this.show = false;
        this.toParentEvent.emit(null);
      });
  }
  showMycard() {
    this.show = true;
    this.ngOnInit();
  }

  isShow(): boolean {
    return this.show
  }
}
