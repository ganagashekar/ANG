import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appConstants } from '../Common/app-constants';
import { AuditFilter } from '../../Model/FilterModels/AuditFilter';



@Injectable({
    providedIn: 'root'
  })

  export class AuditService {
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



    getAllAuditList(filter: AuditFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetAuditAsync', filter);
    }

    deleteaudit(auditID: bigint): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/Deleteaudit?AuditId=' + auditID);
    }

  }
