import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ControllerFilter } from 'src/app/Model/FilterModels/ControllerFilter';



@Injectable({
    providedIn: 'root'
  })

  export class ControllerService {
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



    getAllControllerinfoList(filter: ControllerFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetcontrollerAsync', filter);
    }
    saveController(ControllerDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/SaveController', ControllerDetails);
    }

  }
