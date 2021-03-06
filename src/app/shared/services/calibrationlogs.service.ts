import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appConstants } from '../Common/app-constants';
import { CalibrationlogFilter } from '../../Model/FilterModels/CalibrationlogFilter';




@Injectable({
    providedIn: 'root'
  })

  export class CalibrationlogsService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllCalibrationList(filter: CalibrationlogFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetCalibReportAsync', filter);
    }

  }
