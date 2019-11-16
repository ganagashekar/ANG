
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ReportsService } from 'src/app/shared/services/report.services';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import {  ExceedenceReportModel } from '../../../Model/ServiceResposeModel/Reports/ExceedenceReportModel';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';






@Component({
  selector: 'app-ExceedenceReport',
  templateUrl: './ExceedenceReport.component.html',
  styleUrls: ['./ExceedenceReport.component.scss']
})
export class ExceedenceReportComponent implements OnInit , AfterViewInit {

   updateFlag = true;
   reportRequestModel: ReportRequestModel;
   stacksArray: ReferenceRecords[] = [];
   paramArray: ReferenceRecords[] = [];
   sitesArray:  ReferenceRecords[] = [];
   chartOptions: any;
   parameterFilter: ParameterFilter;

   chartdata: any = [];
   isLoading = false;
   diableGridFilters = true;
   displayedColumns = [];
   dataSource: MatTableDataSource<any>;




  options: any;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _dialog: MatDialog,  private _route: ActivatedRoute,
    private _reportservices: ReportsService,
    private snackBar: MatSnackBar) {
        this.reportRequestModel = new ReportRequestModel();
      this.parameterFilter =  new ParameterFilter();
      this.reportRequestModel.SiteId = Number(localStorage.getItem('SiteId'));
      this.reportRequestModel.FromDate = (new Date());
      this.reportRequestModel.ToDate = (new Date());
      this.reportRequestModel.StackId  = 0;
      this.reportRequestModel.ParamId = 0;
      this.reportRequestModel.IsExport = false;
      this.reportRequestModel.SiteCode = localStorage.getItem('SiteName');
      this.reportRequestModel.TimePeriod = (0);
      this.reportRequestModel.SiteName =  localStorage.getItem('SiteName');
      this.reportRequestModel.ReportTitle = localStorage.getItem('VendorName');
      this.reportRequestModel.ReportType = 'Real time Report ';
      this.reportRequestModel.RequestedUser =  localStorage.getItem('username');
        localStorage.setItem('currentUrl', '/ExceedenceReport');

    this.dataSource =  new MatTableDataSource();

  }


  ngOnInit() {



     this. getAllStacks();
     this.getAllParameterList(this.reportRequestModel.StackId);
     this.getSites();



    // this.getRealtimeReport();
  }

  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {

  }
  getAllStacks(): void {
    this._reportservices.getSiteStacks( this.reportRequestModel.SiteId ,this.reportRequestModel.StackId, true).subscribe(resp => {
      this.stacksArray = resp.model as ReferenceRecords[];
      this.reportRequestModel.StackId = Number(this.stacksArray[0].id);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  getSites(): void {
    this._reportservices.getAllSites(this.reportRequestModel.SiteId, false).subscribe(resp => {
      this.sitesArray = resp.model as ReferenceRecords[];
    }, error => {
      console.log('Error: ' + error);
    });
  }


  getAllParameterList(stackcId): void {

    this.parameterFilter.SiteId = this.reportRequestModel.SiteId;
    this.parameterFilter.StackId = stackcId;
    this.parameterFilter.ParamId = 0;
    this.parameterFilter.IncludeAll = true;

    this._reportservices.GetParameterforStack(this.parameterFilter, true).subscribe(resp => {
     this.paramArray = resp.model as ReferenceRecords[];
     this.reportRequestModel.ParamId = Number(this.paramArray[0].id);
   }, error => {
     console.log('Error: ' + error);
   });
  }

  StackChange(stackId: number): void {
     this.getAllParameterList(stackId);

  }

  onSiteChange(siteId: number) {

  }

  ParameterChange() {

  }


  getRealtimeReport(): void {
    this.isLoading = true;
    this.reportRequestModel.IsExport = false;
    this._reportservices.getExceedenceReport(this.reportRequestModel).subscribe(resp => {
      this.isLoading = false;
      this.displayedColumns =  resp.model.length > 0 ? Object.keys( resp.model[0]) : [];
      if (resp.model.length > 0) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
                                  this.diableGridFilters = false;
                                  this.dataSource.data = resp.model;


                                } else {
                                  this.showSnackBar('No data available ', true);}




    }, error => {
      this.isLoading = false;
      console.log('Error: ' + error);
    });
  }

  OnSearchClick(): void {
   this.getRealtimeReport();
  }

  OnExcelExportClick(): void {


  }
  showSnackBar(message: string, isError: boolean = false): void {
    if (isError) {
      this.snackBar.open(message, 'Ok');
    } else {
      this.snackBar.open(message, 'Ok', {
        duration: 3000
      });
    }
  }

}

