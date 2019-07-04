import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
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
