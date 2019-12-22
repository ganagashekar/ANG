import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appConstants } from '../Common/app-constants';
import { ApplicationLogsFilter } from '../../Model/FilterModels/ApplicationLogsFilter';


@Injectable({
    providedIn: 'root'
  })

  export class ApplicationLogsService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllApplicationLogsinfoList(filter: ApplicationLogsFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetApplicationLogsAsync', filter);
    }
    saveApplicationLogs(ApplicationLogDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/saveApplicationLogs', ApplicationLogDetails);
    }
    deleteApplicationlog(logID: bigint): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteApplicationLog?=' + logID);
    }

  }
