import { MacinoddsApiService } from './../../../service/macinodds-api.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ViewRef, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';
import { RouterLink, Router, RouterModule } from '@angular/router';


import { LyResizingCroppingImages, ImgCropperConfig, ImgResolution } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { AutofillMonitor } from '@angular/cdk/text-field';

import { formatDate } from '@angular/common';



// Set Size of cropping by alyle
const styles = {
  actions: {
    display: 'flex'
  },
  cropping: {
    maxWidth: '500px',
    height: '300px'
  },
  flex: {
    flex: 1
  },
  range: {
    textAlign: 'center'
  }
};



@Component({
  selector: 'app-form-device',
  templateUrl: './form-device.component.html',
  styleUrls: ['./form-device.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDeviceComponent implements OnInit {




  addDeviceForm: FormGroup;





  public results: any; // กำหนดตัวแปร เพื่อรับค่า

  @Input()
  idEditDevice: string;

  @Input()
  editCompoCheck = false;

  btnLabel = 'Cancel';
  CardHeaderLabel = 'ลงทะเบียนอุปกรณ์';


  data: any = {
    name: '',
    serial: '',
    spec: '',
    memo: '',
    img: '',
    location: ''
  };


  name: string;
  serial: string;
  spec: string;
  image = '';
  checker: string;
  status: boolean;
  holder: string;
  tel: string;
  imageDefault = '/assets/imgs/add_device.jpg';
  fileToUpload: File = null;
  vaildatBT = false;
  options: FormGroup;
  fileName: string;
  fileNameEventInput: string;


  base64DefaultURL: any;
  // Set size image at cropping modal
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;

  myConfig: ImgCropperConfig = {

    // autoCrop: true,
    // extraZoomOut: true,
    width: 300, // Default `250`
    height: 300, // Default `200`
    fill: '#fff', // Default transparent if type = png else #000,
    // type: 'image/jpeg',
    output: ImgResolution.OriginalImage // Default ImgResolution.Default
  };

  // End set size image at cropping modal


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private theme: LyTheme2,
    private macApiService: MacinoddsApiService,
    private dialog: MatDialog) {
    this.imageDefault === '/assets/imgs/add_device.jpg' ? this.vaildatBT = false : this.vaildatBT = true;


  }

  @Input()
  checked: boolean;

  ngOnInit() {
    this.createForm();
    // this.getDeviceById(this.idEditDevice);
    // this.getDevice();
    /* this.onSelectionChange();*/

    this.componentSet(this.idEditDevice);
  }


  // getDevice() {
  //   // HTTP request by get() method
  //   // get data from Observable we need subscibe observer to working
  //   this.http.get('http://mac.odds.team/api/mac').subscribe(data => {
  //     // get result from JSON response
  //     this.results = data;
  //     console.log(this.result);
  //   });
  // }
  private createForm() {
    this.addDeviceForm = this.formBuilder.group({
      nameDevice: ['', Validators.required],
      serial: ['', Validators.required],
      spec: ['', Validators.required],
      location: [{ value: 'Hard code', disabled: this.editCompoCheck }, [Validators.required, Validators.minLength(1)]],
    });
  }
  onCropped(e) {
    console.log('eeee')
    this.croppedImage = e.dataURL;
    const cropNew = this.croppedImage.replace(/^data:image\/(png|jpeg);base64,/, '');
    console.log((cropNew));

    const date = new Date().valueOf();
    const text = '';
    const imageName = date + '.' + text + '.jpeg';
    const imageBlob = this.dataURItoBlob(cropNew);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    this.fileName = this.fileNameEventInput
    // this.fileToUpload = imageFile;
    this.fileToUpload = imageFile;
    this.imageDefault = this.croppedImage;
    this.vaildatBT = true;
    // this.canSubmit();

  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  uploadCropImg() {

    document.getElementById('upload-crop-img').click();

  }

  testEvent($event) {
    console.log($event);
  }

  componentSet(id) {
    console.log(id);
    if (this.editCompoCheck) {
      this.btnLabel = 'Cancel';
      this.CardHeaderLabel = 'แก้ไขอุปกรณ์';
      this.macApiService.getMacIDApi(id).subscribe(data => {
        console.log(data);
        this.data = data;
        this.imageDefault = 'http://139.5.146.213/assets/imgs/devices/' + this.data.img;
        this.fileName = this.data.img;
        console.log(this.data.img)
        // this.data.location = 'Hard code location for test';
      });
    } else {
      this.CardHeaderLabel = 'ลงทะเบียนอุปกรณ์';
      this.btnLabel = 'Clear';
      this.imageDefault = '/assets/imgs/add_device.jpg';
    }

  }
  openUploadModal(e) {
    const fileName = e.srcElement.value.toString().split("\\");
    this.fileNameEventInput = fileName[fileName.length - 1];
    document.getElementById('openUploadModal').click();

  }
  cancel() {
    if (this.editCompoCheck) {
      this.router.navigate(['/admin/app/menu-view-admin']);

    } else {
      this.addDeviceForm.reset();
      this.imageDefault = '/assets/imgs/add_device.jpg';
    }
  }
  onSubmit() {
    // create formData to post
    const formData: FormData = new FormData();
    formData.append('name', this.data.name);
    formData.append('serial', this.data.serial);
    formData.append('spec', this.data.spec);
    formData.append('status', 'true');
    formData.append('img', this.fileToUpload);
    // formData.append('holder', this.holder);
    // formData.append('tel', this.tel);
    // console.log(this.tel);
    console.log(JSON.stringify(formData));
    // post method
    if (window.confirm('ยืนยันการบันทึกข้อมูล')) {
      this.http.post('http://mac.odds.team/api/mac', formData)
        .subscribe(result => {
          console.log(result);
          this.cancel();
          this.router.navigate(['/admin/app/menu-view-admin']);
        });
    }
  }
  /*
    onSelectionChange() {
      if (this.checker === 'false') {
        this.status = false;
        this.holder = '';
        this.tel = '';
        this.canSubmit();
      } else {
        this.status = true;
        this.holder = '';
        this.tel = '';
        this.canSubmit();
      }
    }
    createForm() {
      this.options = this.formBuilder.group({
        name: '',
        serial: '',
        spec: '',
        image: '',
        status: '',
        holder: '',
        tel: ''
      });
    }
    getDevice() {
      // HTTP request by get() method
      // get data from Observable we need subscibe observer to working
      this.http.get('http://mac.odds.team/api/mac').subscribe(data => {
        // get result from JSON response
        this.results = data;
      });
    }

    onSubmit() {
      // create formData to post
      const formData: FormData = new FormData();
      formData.append('name', this.name);
      formData.append('serial', this.serial);
      formData.append('spec', this.spec);
      formData.append('status', this.status.toString());
      formData.append('img', this.fileToUpload);
      formData.append('holder', this.holder);
      formData.append('tel', this.tel);
      console.log(this.tel);
      console.log(JSON.stringify(formData));
      // post method
      if (window.confirm('ยืนยันการบันทึกข้อมูล')) {
        this.http.post('http://mac.odds.team/api/mac', formData)
          .subscribe(result => {
            this.getDevice();
            console.log(result);
            this.resetForm();
            this.imageDefault = '/assets/imgs/add_image_icon.png';
            this.router.navigate(['/admin/app/menu-view-admin']);
          });
      }
    }
  
    // method for reset data in field
    resetForm() {
      this.options.reset();
      this.status = true;
      this.image = '';
      this.imageDefault = '/assets/imgs/add_image_icon.png';
      console.log('clear');
    }
  
  
    checkPhoneNum(event: any) {
      const pattern = /[0-9]/;
  
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    // check input in form
    canSubmit() {
      if (this.name && this.serial && this.spec && this.fileToUpload && this.status === false && this.holder && this.tel) {
        // is not empty check unavalible
        this.vaildatBT = true;
  
      } else if (this.name && this.serial && this.spec && this.fileToUpload && this.status === true && !this.holder && !this.tel) {
        // is not empty check avalible
        this.vaildatBT = true;
  
      } else {
        // is empty
        this.vaildatBT = false;
      }
  
    }
  
  
    // Click cropped
    // This use function have covert dataURL to file for add image cropped to imageFile (Send to API)
    onCropped(e) {
      this.croppedImage = e.dataURL;
      console.log(typeof (this.croppedImage));
      const cropNew = this.croppedImage.replace(/^data:image\/(png|jpg);base64,/, '');
      const date = new Date().valueOf();
      const text = '';
      const imageName = date + '.' + text + '.jpeg';
      const imageBlob = this.dataURItoBlob(cropNew);
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
      console.log(typeof (imageFile));
  
      // this.fileToUpload = imageFile;
      this.fileToUpload = imageFile;
      this.imageDefault = this.croppedImage;
      this.canSubmit();
    }
  
  
    // function for convert dataURL to file
    dataURItoBlob(dataURI) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
    }
  
    // onclick upload btn to open modol and click button upload image
    uploadCropImg() {
      document.getElementById('upload-crop-img').click();
    }
  
  */

}