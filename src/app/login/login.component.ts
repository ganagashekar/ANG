import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { appConstants } from '../shared/Common/app-constants';
import { AppComponent } from '../app.component';
import { AccountService } from '../shared/services/account.service';
import { Loginresponse } from '../Model/Account/UserModel';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  userName: string;
  password: string;
  passwordHide: boolean;
  loginForm: FormGroup;
    constructor(private _appcomponent: AppComponent, private formBuilder: FormBuilder,
      private accountService: AccountService, private router: Router) {
      this.passwordHide = true;
    }
    ngOnInit() {
      const userNameRegExPattern = new RegExp(appConstants.USERNAME_PATTERN);
      const passwordRegExPattern = new RegExp(appConstants.PASSWORD_PATTERN);
      this.loginForm = this.formBuilder.group({
        userNameFormControl: new FormControl('', [Validators.required, Validators.pattern(userNameRegExPattern)]),
        passwordFormControl: new FormControl('', [Validators.required, Validators.pattern(passwordRegExPattern)])
      });
    }
    validateUser() {
        if (this.loginForm.valid) {
            this.userName = this.loginForm.controls.userNameFormControl.value;
            this.password = this.loginForm.controls.passwordFormControl.value;
            this.accountService.verifyUser(this.userName, this.password).
              subscribe(
                  data => {
            this.verifyUserCallback(data);
          });
      }
    }
      verifyUserCallback(data: Loginresponse) {
        if (!data.DidError) {
        localStorage.setItem('userName', data.model.userName);
        localStorage.setItem('isLoggedin', 'true');
        this._appcomponent.userName = data.model.userName;
        this._appcomponent.SiteId = data.model.vendorsiteId;
        this._appcomponent.UserId = data.model.userId;
        this.router.navigate(['/dashboard']);
      } else {
       localStorage.removeItem('userName');
       this._appcomponent.userName = '';
       this.errorMsg = 'Invalid User Name / Password';
      }
    }
  }

//     onLogin() {
//         localStorage.setItem('isLoggedin', 'true');
//         this.router.navigate(['/dashboard']);
//     }
// }