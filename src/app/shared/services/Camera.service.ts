import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appConstants } from '../Common/app-constants';
import { CameraFilter } from 'src/app/Model/FilterModels/CameraFilter';



@Injectable({
    providedIn: 'root'
  })

  export class CameraService {
    _baseURL: string;
  _headers: any;
  userName: string;

    constructor(private _httpClient: HttpClient) {
      this._headers = new HttpHeaders().set('content-type', 'application/json');
      this._baseURL = environment.apiUrl;
      this.userName = localStorage.getItem('userName');
    }

    getAllCameraList(filter: CameraFilter): Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/GetcameraAsync', filter);
    }

    saveCamera(CameraDetails: any):  Observable<any> {
      return this._httpClient.post<any>(this._baseURL + appConstants.APICONTROLLER_Admin +
        '/savecamera', CameraDetails);
      }

      deletecamera(camId: number): Observable<boolean> {
        return this._httpClient.delete<boolean>(this._baseURL + appConstants.APICONTROLLER_Admin +
          '/Deletecamera?cam_id=' + camId);
      }
      getAllSites(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/GetSites?SiteId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }

      getAllParam(referenceRecordsTypeId: number , All: boolean): Observable<any> {
        return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
          '/Getparamcalib?paramId=' + referenceRecordsTypeId + '&IncludeAll=' + All);
        }
        getAllstacks(referenceRecordsTypeId: number  , All: boolean): Observable<any> {
          return this._httpClient.get<any>(this._baseURL + appConstants.APICONTROLLER_REFERENCE +
            '/Getconfigs?busID=' + referenceRecordsTypeId + '&IncludeAll=' + All);
          }

  }
