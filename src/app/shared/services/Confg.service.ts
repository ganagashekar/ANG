import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ConfgFilter } from 'src/app/Model/FilterModels/ConfgFilter';



@Injectable({
    providedIn: 'root'
  })

  export class ConfgService {
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



    getAllconfgList(filter: ConfgFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/ConfigAsync', filter);
    }

    saveConfig(configDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/saveConfig', configDetails);
    }
    Deleteconfig(confgID: number): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteConfig?=' + confgID);
    }

  }
