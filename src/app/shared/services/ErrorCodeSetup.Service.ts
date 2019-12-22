import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appConstants } from '../Common/app-constants';
import { ErrorCodeSetupFilter } from '../../Model/FilterModels/ErrorCodeSetupFilter';



@Injectable({
    providedIn: 'root'
  })

  export class ErrorCodeSetupService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('UserName');
    }

      getAllErrorCodeList(filter: ErrorCodeSetupFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GeterrorcodeAsync', filter);
    }

    saveErrorCode(ErrorcodeDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/SaveErrorCodeAsync', ErrorcodeDetails);
    }

    DeleteErrorCode(errorcode: any): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteErrorCode?=' + errorcode);
    }
  }

