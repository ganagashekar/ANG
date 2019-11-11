import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { UserinfoFilter } from 'src/app/Model/FilterModels/UserinfoFilter';



@Injectable({
    providedIn: 'root'
  })

  export class UserinfoService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }


  /*getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
    return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
      '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
    }*/



    getAllUserinfoList(filter: UserinfoFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetuserinfoAsync', filter);
    }
    saveUserinfo(UserinfoDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/SaveUserinfo', UserinfoDetails);
    }
    deleteuserinfo(userId: number): Observable<boolean> {
      alert('hi' + userId);
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteUserinfo?=' + userId);
    }

    // DeleteErrorCode(errorcode: any): Observable<boolean> {
    //   return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
    //     '/DeleteErrorCode?=' + errorcode);
    // }

  }
