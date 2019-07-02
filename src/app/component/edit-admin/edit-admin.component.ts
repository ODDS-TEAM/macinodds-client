import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ViewRef, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyDataServiceService } from '../my-data-service.service';
import { Router } from '@angular/router';


import { LyResizingCroppingImages, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { AutofillMonitor } from '@angular/cdk/text-field';



// Set Size of cropping
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
  }
};

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {



  // Set size image at cropping
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 300, // Default `250`
    height: 300, // Default `200`,
    output: {
      width: 400,
      height: 400
    }
  };
  base64DefaultURL: any;

  public results: any;
  public editResults: any;
  idEditDevice: string;
  name: string;
  serial: string;
  spec: string;
  image: any = null;
  status = true;
  holder: string;
  options: FormGroup;
  checker: string;
  tel: string;
  imageDefault = '/assets/imgs/add_device.jpg';
  fileToUpload: File = null;
  vaildatBT = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private data: MyDataServiceService,
              private router: Router,
              private theme: LyTheme2
  ) { }

  ngOnInit() {
    this.editResults = {};
    this.createForm();
    this.data.currentData.subscribe(data => this.idEditDevice = data);
    this.editDevice();
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
  onSelectionChange() {
    if (this.checker === 'false') {
      this.status = false;
      this.holder = '';
      this.tel = '';
      // this.canSubmit();
    } else {
      this.status = true;
      this.holder = '';
      this.tel = '';
      // this.canSubmit();
    }
  }

  onSubmit(id) {
    const formData: FormData = new FormData();
    formData.append('name', this.name);
    formData.append('serial', this.serial);
    formData.append('spec', this.spec);
    formData.append('status', this.status.toString());
    formData.append('holder', this.holder);
    formData.append('tel', this.tel);
    formData.append('img', this.fileToUpload);

    console.log('Put data **** : ' + JSON.stringify(formData));
    this.http.put('http://mac.odds.team/api/mac/' + this.idEditDevice, formData).subscribe(data => {
      this.getDevice();
      console.log('Put data : ' + JSON.stringify(data));
      this.backView();
    });

  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDefault = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  getDevice() {
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.http.get('http://mac.odds.team/api/mac').subscribe(data => {
      // get result from JSON response
      this.results = data;
    });
  }

  editDevice() {
    this.http.get('http://mac.odds.team/api/mac/' + this.idEditDevice).subscribe(data => {
      this.editResults = data;
      console.log('print edit data : ' + data);
      console.log('print edit data JSON.stringify : ' + JSON.stringify(data));
      console.log('print edit editResults : ' + this.editResults);
      console.log('picture name : ' + this.editResults.img);

      this.name = this.editResults.name;
      this.serial = this.editResults.serial;
      this.spec = this.editResults.spec;
      this.status = this.editResults.status;
      this.holder = this.editResults.holder;
      this.tel = this.editResults.tel;
      this.imageDefault = 'http://139.5.146.213/assets/imgs/devices/' + this.editResults.img;
      this.fileToUpload = this.editResults.img;

      console.log('image == set ==> ' + this.fileToUpload);
    });
  }

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

  backView() {
    this.router.navigate(['/admin/app/menu-view-admin']);
  }

  checkPhoneNum(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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


uploadCropImg() {
  document.getElementById('upload-crop-img').click();
}

}




