import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { CalibrationFilter } from 'src/app/Model/FilterModels/CalibrationFilter';



@Injectable({
    providedIn: 'root'
  })

  export class CalibrationService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllCalibrationList(filter: CalibrationFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetcalibrationsetupAsync', filter);
    }
    saveCalibration(CalibrationDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/Savecalibrationsetup', CalibrationDetails);
    }
    Deletecalibration(calib_cmd_id: number): Observable<boolean> {
      alert('hello' + calib_cmd_id);
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteCalibration?=' + calib_cmd_id);
    }

  }
