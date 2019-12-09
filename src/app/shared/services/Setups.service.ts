import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';



@Injectable({
    providedIn: 'root'
  })

  export class SetupsService {


    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }
getAllStacks(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
  return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
    '/GetStacks?StackId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
  }

  getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
    return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
      '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
    }

  getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
    return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
      '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
    }

    getAllParameterList(filter: ParameterFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetParametersAsync', filter);
    }
    saveParameter(paramterDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/SaveParameterAsync', paramterDetails);
    }


    deleteParameter(paramid: number): Observable<boolean> {
      // const httpOptions = { headers: this._headers };httpOptions
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteParameter?paramId=' + paramid);
    }

  }
