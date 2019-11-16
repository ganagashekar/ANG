import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { appConstants } from '../shared/Common/app-constants';
import { AppComponent } from '../app.component';
import { AccountService } from '../shared/services/account.service';
import { Loginresponse } from '../Model/Account/UserModel';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private _appcomponent: AppComponent, private formBuilder: FormBuilder,
      private accountService: AccountService, private router: Router, private snackBar: MatSnackBar) {
      this.passwordHide = true;
    }

  errorMsg: string;
  userName: string;
  password: string;
  passwordHide: boolean;
  loginForm: FormGroup;


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
                    if (data == null) {
                      this.showSnackBar('Invalid User Name / Password', true);
                      return;
                    }
            this.verifyUserCallback(data);
          });
      }
    }
      verifyUserCallback(data: Loginresponse) {



        if (!data.didError) {


          this.showSnackBar('Welcome ,' + data.model.userName, false);

        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('SiteName', data.model.site.siteName);
        localStorage.setItem('VendorName','VASTHI');
        localStorage.setItem('SiteCity', data.model.site.site_city);
        localStorage.setItem('SiteId', (data.model.site.siteId).toString());
        localStorage.setItem('currentUrl', '/login');
        this._appcomponent.userName = data.model.userName;
        this._appcomponent.SiteId = Number(data.model.site.siteId);
        this._appcomponent.UserId = data.model.userId;
        // const navigationExtras: NavigationExtras = {
        //   state: {
        //     userdata: data,
        //   }
        // };

        const navigationExtras: NavigationExtras = {
          state: data,
        };

        this.showSnackBar('Welcome back, ' +  data.model.userName + ',   Your site :' + data.model.site.siteName, false);
        this.router.navigate(['/dashboard'], navigationExtras );
      } else {
       localStorage.removeItem('userName');
       this._appcomponent.userName = '';
       this.errorMsg = 'Invalid User Name / Password';

       this.showSnackBar('Invalid User Name / Password', true);
      }
    }

    showSnackBar(message: string, isError: boolean = false): void {
      if (isError) {
        this.snackBar.open(message, 'Ok');
      } else {
        this.snackBar.open(message, 'Ok', {
          duration: 3000
        });
      }
    }


  }



//     onLogin() {
//         localStorage.setItem('isLoggedin', 'true');
//         this.router.navigate(['/dashboard']);
//     }
// }
