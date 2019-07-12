import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';


@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    // private dialog: MatDialog,
  ) { }

  private user: SocialUser;
  firstLoginForm: FormGroup;

  nextPage() {
    console.log('valid no get = ' + this.firstLoginForm.valid)
    console.log('value = ' + this.firstLoginForm.get('telephoneNumb').value)
    console.log('validator.name = ' + this.firstLoginForm.get('telephoneNumb').validator.name)
    console.log('status = ' + this.firstLoginForm.get('telephoneNumb').status)
    console.log('valid = ' + this.firstLoginForm.get('telephoneNumb').valid)
    console.log('validator.length = ' + this.firstLoginForm.get('telephoneNumb').validator.length)
    if (this.firstLoginForm.get('slackAccount').valid && this.firstLoginForm.get('telephoneNumb').valid) {
      this.router.navigate(['/admin/app/menu-view-admin']);
    }
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // this.loggedIn = (user != null); 

    });
    this.firstLoginForm = new FormGroup({
      'fullName': new FormControl({ value: '', disabled: true }, Validators.required),
      'emailODDS': new FormControl({ value: '', disabled: true }, Validators.required),
      'slackAccount': new FormControl('', [Validators.email, Validators.required]),
      'telephoneNumb': new FormControl('', [Validators.min(10), Validators.pattern('[0-9]{10}'), Validators.required])
    });


  }

}
