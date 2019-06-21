import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { puts } from 'util';

@Component({
  selector: 'app-menu-view-admin',
  templateUrl: './menu-view-admin.component.html',
  styleUrls: ['./menu-view-admin.component.css']
})
export class MenuViewAdminComponent implements OnInit {

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image: any = null;
  status = true;
  holder: string;
  checker: string;
  imageDefault = '/assets/imgs/logo4.png';
  fileToUpload: File = null;
  disabledDivs = true;

  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editResults = {};
    this.getDevice();
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


  getDevice() {
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
    });

  }

  // get device id for show data
  getDeviceByID(id) {
    console.log('print id : ' + id);
    this.http.get('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
      // read result form JSON response
      this.editResults = data;
    });
  }

  // delete device when click button by id device
  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
        this.getDevice();
      });
    }
  }

  // method for when click edit button
  editDevice(id, serial) {
    this.http.get('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
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
      this.imageDefault = 'http://139.5.146.213/assets/imgs/devices/' + this.editResults.img;
      this.fileToUpload = this.editResults.img;
      console.log('image == set ==> ' + this.fileToUpload);
    });
  }


  // create formData to post
  onSubmit(id) {
    const formData: FormData = new FormData();
    formData.append('name', this.name);
    formData.append('serial', this.serial);
    formData.append('spec', this.spec);
    formData.append('status', this.status.toString());
    formData.append('holder', this.holder);
    formData.append('img', this.fileToUpload);

    console.log('Put data **** : ' + JSON.stringify(formData));
    this.http.put('http://139.5.146.213:1323/api/devices/' + id, formData).subscribe(data => {
      this.getDevice();
      console.log('Put data : ' + JSON.stringify(data));
    });

  }

  // method Selection for radio button
  onSelectionChange() {
    if (this.checker === 'false') {
      this.status = false;
      this.holder = '';
    } else {
      this.status = true;
      this.holder = '';
    }
  }

  // check change image and show image in src
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDefault = event.target.result;

    };
    reader.readAsDataURL(this.fileToUpload);
    console.log('image == change ==> ' + this.fileToUpload);
  }

  // method for reset data in field
  resetFrom() {
    this.options.reset();
    console.log('clear');
  }

}
