import { Component, OnInit} from '@angular/core';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';

@Component({
  selector: 'app-menu-view-user',
  templateUrl: './menu-view-user.component.html',
  styleUrls: ['./menu-view-user.component.css']
})


export class MenuViewUserComponent implements OnInit {

  constructor(private macApiService: MacinoddsApiService) { }

  ngOnInit() {
  }


}
