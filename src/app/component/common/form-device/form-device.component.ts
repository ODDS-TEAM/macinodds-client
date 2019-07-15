import { MacinoddsApiService } from './../../../service/macinodds-api.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ViewRef, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';
import { RouterLink, Router, RouterModule } from '@angular/router';


import { LyResizingCroppingImages, ImgCropperConfig, ImgResolution } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { AutofillMonitor } from '@angular/cdk/text-field';





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

  readonly imageDefaultPath: string = '/assets/imgs/add_device.jpg';



  addDeviceForm: FormGroup;

  public results: any; // กำหนดตัวแปร เพื่อรับค่า

  @Input()
  idEditDevice: string;

  @Input()
  editCompoCheck = false;

  btnLabel = 'Cancel';
  CardHeaderLabel = 'ลงทะเบียนอุปกรณ์';


  backupData: any = {
    name: '',
    serial: '',
    spec: '',
    // memo: '',
    img: '',
    location: ''
  };

  data: any = {
    name: '',
    serial: '',
    spec: '',
    // memo: '',
    imgs: null,
    location: ''

  };


  imageDefault = this.imageDefaultPath;
  fileToUpload: File = null;
  vaildatBT = false;
  fileName: string;
  fileNameEventInput: string;
  base64DefaultURL: any;

  // Set size image at cropping modal
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;

  myConfig: ImgCropperConfig = {

    autoCrop: false,
    // extraZoomOut: true,
    width: 300, // Default `250`
    height: 300, // Default `200`
    fill: '#fff', // Default transparent if type = png else #000,
    // type: 'image/jpeg',
    extraZoomOut: true
  };

  // End set size image at cropping modal


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private theme: LyTheme2,
    private macApiService: MacinoddsApiService) {
    this.imageDefault === this.imageDefaultPath ? this.vaildatBT = false : this.vaildatBT = true;

  }

  @Input()
  checked: boolean;

  ngOnInit() {
    this.createForm();
    this.componentSet(this.idEditDevice);
  }

  private createForm() {
    this.addDeviceForm = this.formBuilder.group({
      nameDevice: ['', Validators.required],
      serial: ['', Validators.required],
      spec: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onCropped(e) {
    console.log('eeee');
    this.croppedImage = e.dataURL;
    const cropNew = this.croppedImage.replace(/^data:image\/(png|jpeg);base64,/, '');
    console.log((cropNew));

    const date = new Date().valueOf();
    const text = '';
    const imageName = date + '.' + text + '.jpeg';
    const imageBlob = this.dataURItoBlob(cropNew);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    this.fileName = this.fileNameEventInput;
    // this.fileToUpload = imageFile;
    this.fileToUpload = imageFile;
    this.imageDefault = this.croppedImage;
    this.vaildatBT = true;
    // this.canSubmit();
    console.log("fileupload ====> " + this.fileToUpload);
    this.data.img = imageFile;
    console.log("file data ====> " + this.data.img);
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

  componentSet(id) {
    console.log(id);
    if (this.editCompoCheck) {
      this.btnLabel = 'Cancel';
      this.CardHeaderLabel = 'แก้ไขอุปกรณ์';
      this.macApiService.getMacIDApi(id).subscribe(res => {
        this.data = res;
        this.backupData = Object.assign({}, this.data);
        this.imageDefault = 'http://139.5.146.213/assets/imgs/devices/' + this.data.img;
        this.fileName = this.data.img;
      });
    } else {
      this.CardHeaderLabel = 'ลงทะเบียนอุปกรณ์';
      this.btnLabel = 'Clear';
      this.imageDefault = this.imageDefaultPath;
      this.vaildatBT = false;
    }
  }
  openUploadModal(e) {
    const fileName = e.srcElement.value.toString().split("\\");
    this.fileNameEventInput = fileName[fileName.length - 1];
    document.getElementById('openUploadModal').click();
  }

  cancel() {
    // edit form
    if (this.editCompoCheck) {
      this.router.navigate(['/admin/app/menu-view-admin']);
    }
    // add form 
    else {
      this.addDeviceForm.reset();
      this.imageDefault = this.imageDefaultPath;
      this.fileName = '';
      this.vaildatBT = false;
    }
  }

  onSubmit() {
    // create formData to post
    const formData: FormData = new FormData();
    formData.append('name', this.data.name);
    formData.append('serial', this.data.serial);
    formData.append('spec', this.data.spec);
    formData.append('img', this.fileToUpload);
    formData.append('location', this.data.location);

    // check page is edit
    if (this.editCompoCheck) {
      formData.append('img', this.fileToUpload);
      this.macApiService.putMacAPI(this.idEditDevice, formData).subscribe(data => {
        this.router.navigate(['/admin/app/menu-view-admin']);
      });
    } else {
      // page is add device
      // post method
      if (window.confirm('ยืนยันการบันทึกข้อมูล')) {
        this.macApiService.postMacAPI(formData).subscribe(data => {
            console.log(formData);
            this.cancel();
            this.router.navigate(['/admin/app/menu-view-admin']);
          });
      }
    }
  }

  // validat จ้า
  validatorName() {
    this.data.name !== this.backupData.name ? this.vaildatBT = true : this.vaildatBT = false;
  }
  validatorSerial() {
    this.data.serial !== this.backupData.serial ? this.vaildatBT = true : this.vaildatBT = false;
  }
  validatorSpec() {
    this.data.spec !== this.backupData.spec ? this.vaildatBT = true : this.vaildatBT = false;
  }
  validatorImg() {
    this.data.img !== this.backupData.img ? this.vaildatBT = true : this.vaildatBT = false;
  }

}
