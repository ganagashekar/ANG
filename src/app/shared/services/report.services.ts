import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
import { DATA } from 'src/app/layout/Reports/AverageReport/highchartmock';
import { ReportRequestModel } from '../../Model/Report/ReportRequestModel';





@Injectable({
    providedIn: 'root'
  })

  export class ReportsService {


    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }
    // getAverageReport(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
    //   return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REPORTS +
    //     '/GetAverageReports');
    //   }

      getAverageReport(filter: ReportRequestModel): Observable<any> {
        return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_REPORTS +
          '/FetchAverageReports', filter);
      }
      getAllStacks(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/GetStacks?StackId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }

        GetParameterforStack(filter: ParameterFilter, All: boolean): Observable<any> {
        return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/GetParameterforStack', filter);
        }

      getData(): Promise<any> {
        return Promise.resolve(DATA);
      }

      getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }

        getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
          return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
            '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
          }

  }
