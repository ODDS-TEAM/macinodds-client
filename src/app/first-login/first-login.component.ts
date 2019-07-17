import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';
import { User } from '../shared/user';
import { MacinoddsApiService } from '../service/macinodds-api.service';


@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  macinoddsService: MacinoddsApiService;
  private user: SocialUser;
  // users: User;
  id = sessionStorage.getItem('idUser');
  role = sessionStorage.getItem('role');
  firstLoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuild: FormBuilder,
    // private dialog: MatDialog,
  ) { }

  nextPage() {
    console.log('valid no get = ' + this.firstLoginForm.valid)
    console.log('value = ' + this.firstLoginForm.get('telephoneNumb').value)
    console.log('validator.name = ' + this.firstLoginForm.get('telephoneNumb').validator.name)
    console.log('status = ' + this.firstLoginForm.get('telephoneNumb').status)
    console.log('valid = ' + this.firstLoginForm.get('telephoneNumb').valid)
    console.log('validator.length = ' + this.firstLoginForm.get('telephoneNumb').validator.length)

    const { fullName, emailODDS, slackAccount, telephoneNumb } = this.firstLoginForm.getRawValue();

    // tslint:disable-next-line:max-line-length
    if (telephoneNumb && slackAccount
    ) {
      //   if (this.role === 'corporate') {
      //   if (corporateName === '') {
      //     alert('Please complete the information.');
      //     return;
      //   }
      //   this.user.corporateName = corporateName;
      // }
      // this.user.firstName = firstName;
      // this.user.lastName = lastName;
      // this.user.bankAccountName = bankAccountName;
      // this.user.bankAccountNumber = bankAccountNumber;
      // this.user.slackAccount = slackAccount;
      // this.user.role = this.role;
      // this.user.vat = this.vat;
      // this.user.siteId = siteId;
      // this.user.project = project;
      // this.updateUser();
    } else {
      alert('Please complete the information.');
    }

    console.log(this.role);

    if (this.firstLoginForm.get('slackAccount').valid && this.firstLoginForm.get('telephoneNumb').valid) {
       if (this.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }

  ngOnInit() {
    console.log(this.user + '<<<<<<');
    this.setup();

    this.authService.authState.subscribe((users) => {
      this.user = users;
      // this.loggedIn = (user != null); 
      console.log(this.user);
    });
  }

  setup() {
    this.firstLoginForm  = new FormGroup({
      fullName: new FormControl({ value: '', disabled: true }, Validators.required),
      emailODDS: new FormControl({ value: '', disabled: true }, Validators.required),
      slackAccount: new FormControl('', [Validators.email, Validators.required]),
      telephoneNumb: new FormControl('', [Validators.min(10), Validators.pattern('[0-9]{10}'), Validators.required])
    });
  }
  getRole() {
    this.macinoddsService.getRoleUser(this.id).subscribe(res => {
      this.role = res.role;
    })
  }

}
