import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DeviceApiService } from 'src/app/service/device-api.service';

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
  hide: boolean = false;

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
  ) {}

  ngOnInit() {
    this.createForm();
    this.macApiService.getMyDevice().subscribe(res => {
      this.dataObject = res[0];
      this.returnDate = new Date(this.dataObject.returnDate).toLocaleDateString('pt-PT');
      if (this.dataObject)
        this.hide = true;
    })
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
    if (window.confirm('ยืนยันการคืนเครื่อง')) {
      this.macApiService.postReturn(this.dataObject._id, JSON.stringify(object))
        .subscribe(result => {
          location.reload();
        });
    }
  }
}
