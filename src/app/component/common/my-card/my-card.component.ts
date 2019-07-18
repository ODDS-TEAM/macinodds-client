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

  userId = localStorage.getItem('userId');
  returnDate: any;
  returnMemo: string;
  returnLocation: string;
  vaildatBT = false;



  @Input()
  dataObject: any = {
    name: '',
    serial: '',
    spec: '',
    returnDate: '',
    img: ''
  };




  constructor(
    private macApiService: DeviceApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.returnDate = new Date(this.dataObject.returnDate).toLocaleDateString('pt-PT');
    
  }

  private createForm() {
    this.modalForm = this.formBuilder.group({
      memo: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmitReturn() {
    console.log('memo' + this.returnMemo);
    console.log('location' + this.returnLocation);
    const returnData: FormData = new FormData();
    returnData.append('returnDate', this.returnMemo);
    returnData.append('returnDate', this.returnLocation);
    // borrowData.append('token', token);

    // post method
    if (window.confirm('ยืนยันการคืนเครื่อง')) {
      this.macApiService.postReturn(this.userId, returnData)
        .subscribe(result => {
          console.log(result);
          location.reload();
        });
    }




  }


}
