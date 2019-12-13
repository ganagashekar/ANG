import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { CalibReportFilter } from 'src/app/Model/FilterModels/CalibReportFilter';

@Injectable({
  providedIn: 'root'
})

export class CalibReportService {
  _baseURL: string;
_headers: any;
userName: string;

  constructor(private _httpClient: HttpClient) {
    this._headers = new HttpHeaders().set('content-type', 'application/json');
    this._baseURL = environment.apiUrl;
    this.userName = localStorage.getItem('userName');
  }

  getAllCalibrationList(filter: CalibReportFilter): Observable<any> {
    return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
      '/GetCalibReportAsync', filter);
  }

  Deletecalibreport(calibsetupid: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
      '/DeleteCalibreport?calibsetupid=' + calibsetupid);

}
saveCalibration(CalibrationDetails: any):  Observable<any> {
  return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
    '/Savecalibreport', CalibrationDetails);
  }
  getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
    return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
      '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
    }
    getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
      }

      getAllParam(paramname: string , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/Getparamcalib?paramname=' + paramname + '&IncludeAll=' + All);
        }

}
