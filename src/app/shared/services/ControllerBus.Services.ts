import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ControllerBusFilter } from 'src/app/Model/FilterModels/ControllerBusFilter';



@Injectable({
    providedIn: 'root'
  })

  export class ControllerBusService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
      }

    getAllControllerBusinfoList(filter: ControllerBusFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetcontrollerBusAsync', filter);
    }

    getAllControllerbus(macId: string  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/CtrMacID?macId=' + macId + '&IncludeAll=' + All);
      }

    getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
      }
    saveControllerBus(ControllerBusDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/saveControllerBus', ControllerBusDetails);
    }
    deletecontrollerbus(busId: bigint): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteControllerBus?=' + busId);
    }

  }
