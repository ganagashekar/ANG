import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
import { DashboardTableRequestModel } from 'src/app/Model/FilterModels/DashboardTableRequestModel';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  _baseURL: string;
_headers: any;
userName: string;

  constructor(private _httpClient: HttpClient) {
    this._headers = new HttpHeaders().set('content-type', 'application/json');
    this._baseURL = environment.apiUrl;
    this.userName = localStorage.getItem('userName');
  }

  getDashboardQuickCounts(filter: DashboardTableRequestModel): Observable<any> {
    return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Dashboard +
      '/GetDashboardQuickCounts', filter);
  }
  getDashboardQuickTableData(dashboardTableRequest: DashboardTableRequestModel) {
    return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Dashboard +
      '/GetDashboardQuickData', dashboardTableRequest);
  }
  getDashboarChart(dashboardTableRequest: DashboardTableRequestModel) {
    return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Dashboard +
      '/getDashboarChart', dashboardTableRequest);
  }
  
}
