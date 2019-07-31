import { Component, OnInit } from '@angular/core';
import { MyDataServiceService } from '../my-data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})


export class EditAdminComponent implements OnInit {
  editCompCheck = true;
  idEditDevice: string;

  constructor(private data: MyDataServiceService, private router: Router) {
    // tslint:disable-next-line:no-shadowed-variable
    this.data.currentData.subscribe(data => {
      this.idEditDevice = data;

    });
  }

  ngOnInit() {
  }
}