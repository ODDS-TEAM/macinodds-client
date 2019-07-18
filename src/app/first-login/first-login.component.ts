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
  private user: SocialUser;
  users: User;
  id = sessionStorage.getItem('idUser');
  role = localStorage.getItem('role');
  name = localStorage.getItem('Username');
  mail = localStorage.getItem('email');
  imageProfile = localStorage.getItem('image');
  firstLoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuild: FormBuilder,
    private macinoddsService: MacinoddsApiService
    // private dialog: MatDialog,
  ) { }


  nextPage() {
    console.log('valid no get = ' + this.firstLoginForm.valid)
    console.log('value.name = ' + this.firstLoginForm.get('fullName').value)
    console.log('value = ' + this.firstLoginForm.get('telephoneNumb').value)
    console.log('validator.name = ' + this.firstLoginForm.get('telephoneNumb').validator.name)
    console.log('status = ' + this.firstLoginForm.get('telephoneNumb').status)
    console.log('valid = ' + this.firstLoginForm.get('telephoneNumb').valid)
    console.log('validator.length = ' + this.firstLoginForm.get('telephoneNumb').validator.length)

    const { slackAccount, telephoneNumb } = this.firstLoginForm.getRawValue();

    // tslint:disable-next-line:max-line-length
    if (telephoneNumb && slackAccount
    ) {

      this.users = new User();
      this.users.name = this.name;
      this.users.email = this.mail;
      this.users.imgProfile = this.imageProfile;
      this.users.slackAccount = slackAccount;
      this.users.tel = telephoneNumb;
      // console.log(...registerForm);
      
      // this.users.role = this.role;
      // this.macinoddsService.updateUser(registerForm).subscribe(res=>{console.log('toptotptoptotpto')})
      console.log(this.users+'<<<<<<'+JSON.stringify(this.users))
      const usersToString =JSON.stringify(this.users)
      const usersToStringToOBJ = JSON.parse(usersToString);
      console.log(usersToStringToOBJ+'<<<<testA<<'+JSON.stringify(usersToStringToOBJ))

      this.macinoddsService.updateUser(usersToStringToOBJ).subscribe(res => {
          console.log('1324567890-'+ res);
          if (this.firstLoginForm.get('slackAccount').valid && this.firstLoginForm.get('telephoneNumb').valid) {
            localStorage.removeItem('userResult');
            if (this.role === 'individual') {
              this.router.navigate(['/user']);
            } else {
              this.router.navigate(['/login']);
            }
            // } error => {
            //   this.router.navigate(['/login']);
            // }
          }
        }, error => {
          this.router.navigate(['/login']);
        });
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
