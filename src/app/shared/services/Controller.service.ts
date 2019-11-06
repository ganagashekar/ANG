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



    getAllControllerinfoList(filter: ControllerFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetcontrollerAsync', filter);
    }

    saveController(ErrorcodeDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/SaveErrorCodeAsync', ErrorcodeDetails);
    }

    deleteController(MacId: any): Observable<boolean> {
      alert('hi');
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteController?=' + MacId);
    }
  }
