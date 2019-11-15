import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { SiteSetupFilter } from 'src/app/Model/FilterModels/SiteSetupFilter';



@Injectable({
    providedIn: 'root'
  })

  export class SitesetupService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllSitesetupList(filter: SiteSetupFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetsiteAsync', filter);
    }

    getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
      }

    savesite(SiteDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/saveSite', SiteDetails);
    }

    DeleteSite(siteId: string): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteSite?=' + siteId);
    }

  }
