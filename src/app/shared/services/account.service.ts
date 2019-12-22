import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { appConstants } from '../Common/app-constants';



@Injectable({
  providedIn: 'root'
})

export class AccountService {

  _baseURL: string;
  _headers: any;

  constructor(private _httpClient: HttpClient) {
    this._headers = new HttpHeaders().set('content-type', 'application/json');
    this._baseURL = environment.apiUrl;
  }

  getAllRoles(): Observable<string[]> {
    return this._httpClient.get<string[]>(this._baseURL + appConstants.APICONTROLLER_ACCOUNT + '/GetAllRoles');
  }


  verifyUser(userName: string, password: string): Observable<any> {

    return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_ACCOUNT
      + '/ValidateUser?userName=' + encodeURIComponent(userName) + '&password=' + encodeURIComponent(password));
   }
  //  ValidateUser(userName: string, password: string): Observable<any> {
  //   return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_ACCOUNT
  //     + '/ValidateUser?userName=' + encodeURIComponent(userName) + '&password=' + encodeURIComponent(password));
  //  }

}
