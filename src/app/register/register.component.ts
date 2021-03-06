import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatRadioButton, MatCardModule, MatDialog } from '@angular/material';
import { User } from '../shared/user';
import { MacinoddsApiService } from '../service/macinodds-api.service';
import { error } from 'util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userResult: any;
  private user: SocialUser;
  users: User;
  id = sessionStorage.getItem('idUser');
  role = localStorage.getItem('role');
  name = localStorage.getItem('Username');
  mail = localStorage.getItem('email');
  imageProfile = localStorage.getItem('image');
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuild: FormBuilder,
    private macinoddsService: MacinoddsApiService
  ) { }


  submit() {

    const { slackAccount, telephoneNumb } = this.registerForm.getRawValue();

    if (telephoneNumb && slackAccount
    ) {

      this.users = new User();
      this.users.name = this.name;
      this.users.email = this.mail;
      this.users.imgProfile = this.imageProfile;
      this.users.slackAccount = slackAccount;
      this.users.tel = telephoneNumb;
      const usersToString = JSON.stringify(this.users)
      const usersToStringToOBJ = JSON.parse(usersToString);

      this.macinoddsService.updateUser(usersToStringToOBJ).subscribe(res => {
        if (this.registerForm.get('slackAccount').valid && this.registerForm.get('telephoneNumb').valid) {
          localStorage.removeItem('userResult');
          if (this.role === 'individual') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          alert('Please fill your true telephone number');
        }
      }, error => {
        this.router.navigate(['/login']);
      });
    } else {
      alert('Please complete the information.');
    }
  }

  ngOnInit() {
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
    this.registerForm = new FormGroup({
      slackAccount: new FormControl('', [Validators.required]),
      telephoneNumb: new FormControl('', [Validators.min(10), Validators.pattern('[0-9]{10}'), Validators.required])
    });
  }
}
