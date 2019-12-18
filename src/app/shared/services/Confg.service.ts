import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { ConfgFilter } from 'src/app/Model/FilterModels/ConfgFilter';



@Injectable({
    providedIn: 'root'
  })

  export class ConfgService {
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

    getAllBusss(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/Getconfigs?busID=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }

        getAlldisplayoutputs(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
            return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
              '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
            }

    getAllconfgList(filter: ConfgFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/ConfigAsync', filter);
    }

    saveConfig(configDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/saveConfig', configDetails);
    }
    Deleteconfig(confgId: number): Observable<boolean> {
      return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/DeleteConfig?confgId=' + confgId);
    }
    // getAllstack(stack_typ: string  , All: boolean): Observable<any> {
    //   return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
    //     '/Getstacktype?stack_typ=' + stack_typ + '&IncludeAll=' + All);
    //   }
    getReferencerecords(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
      return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
        '/GetReferenceRecords?ReferenceTypeId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
      }
      getAllBus(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/Getconfigbybusid?BusId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }

  }
