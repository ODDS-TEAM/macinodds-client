import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';
import { User } from '../shared/user';
import { MacinoddsApiService } from '../service/macinodds-api.service';
import { error } from 'util';


@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
  userResult: any;
  macinoddsService: MacinoddsApiService;
  private user: SocialUser;
  users: User;
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
      this.users = new User();
      this.users.fullName = fullName;
      this.users.email = emailODDS;
      this.users.slackAccount = slackAccount;
      this.users.tel = telephoneNumb;
      this.users.role = this.role;
      // this.macinoddsService.updateUser(sessionStorage.getItem('idUser'), this.users)
      //   .subscribe(res => {
          if (this.firstLoginForm.get('slackAccount').valid && this.firstLoginForm.get('telephoneNumb').valid) {
            localStorage.removeItem('userResult');
            if (this.users.role === 'individual') {
              this.router.navigate(['/user']);
            } else {
              this.router.navigate(['/login']);

            }
          } error => {
            this.router.navigate(['/login']);
          }
        // }, error => {
        //   this.router.navigate(['/login']);
        // });
      // this.macinoddsService.postUsertoMock(id,role,NAME,MAIL,PHOTO)
    } else {
      alert('Please complete the information.');
    }

    console.log(this.role);

  }


  ngOnInit() {
    // console.log(this.user + '<<<<<<');


    this.authService.authState.subscribe((users) => {
      this.userResult = users;

      if (this.userResult !== null) {
        this.user = users;
        localStorage.setItem('userResult', JSON.stringify(this.user));
      } else {
        this.user = JSON.parse(localStorage.getItem('userResult'));
      }
    });

    this.setup();

  }

  setup() {
    this.firstLoginForm = new FormGroup({
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
