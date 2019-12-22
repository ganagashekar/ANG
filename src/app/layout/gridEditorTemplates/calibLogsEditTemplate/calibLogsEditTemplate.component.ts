


import { Component, OnInit, Output, Inject, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CalibrationlogsService } from '../../../shared/services/calibrationlogs.service';
import { ReferenceRecords } from '../../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CalibrationlogModel } from '../../../Model/ServiceResposeModel/Setups/CalibLogsModel';
import { CalibrationlogFilter } from '../../../Model/FilterModels/calibrationlogFilter';
import * as Highcharts from 'highcharts/highstock';
import * as _moment from 'moment';
import * as HC_exporting_ from 'highcharts/modules/exporting';
import { HighchartsChartModule } from 'highcharts-angular';
import { appConstants } from '../../../shared/Common/app-constants';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { DashboardTableRequestModel } from '../../../Model/FilterModels/DashboardTableRequestModel';
import { DashboardQuickDataModel } from '../../../Model/ServiceResposeModel/Dashboard/DashboardQuickDataModel';
import { DashboardService } from '../../../shared/services/Dashboard.Services';
const HC_exporting = HC_exporting_;
import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';


@Component({
  selector: 'app-calibLogsEditTemplate',
  templateUrl: './calibLogsEditTemplate.component.html',
  styleUrls: ['./calibLogsEditTemplate.component.scss']
})
export class CalibLogsEditTemplateComponent implements OnInit {

  SelectedView: string;
  Viewtypes = [
    {
      key: 'Graph View',
      checked: false
    }];
  Highcharts = Highcharts;
   updateFlag = true;
   IsGraphView = false;

   chartOptions: any;
   SiteId: number ;
   dashboardTableRequest: DashboardTableRequestModel;
   reportRequestModel: ReportRequestModel;
   chartdata: any = [];
   isLoading = false;
   diableGridFilters = true;
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  options: any;
   chatsss: any;
   DashboardQuickDataResposne: DashboardQuickDataModel[] = [];

  @Output()
  CalibLogsEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  isAdd = true;
 Selectedconfg_id: bigint ;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
  SelectedvendorsiteId: bigint;
  editModel: CalibrationlogModel;
  CalibrationlogFilter: CalibrationlogFilter;

  @ViewChild('container', { read: ElementRef , static: true }) container: ElementRef;
  constructor(public dialogRef: MatDialogRef<CalibLogsEditTemplateComponent>,
    private _dashboardService: DashboardService,
    private _calibrationlogsServices: CalibrationlogsService,

    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.CalibrationlogFilter = new CalibrationlogFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as CalibrationlogModel );
       this.Selectedconfg_id = this.editModel.confgId;
      }
      this.getCalibrationreport(881, 31, null);
    //  this.reportRequestModel = new ReportRequestModel();
    // //  this.reportRequestModel.ParamId = 0;
    // //  this.reportRequestModel.StackId  = 0;

    //  this.reportRequestModel.IsExport = false;
    //  this.reportRequestModel.SiteCode = localStorage.getItem('SiteName');
    //  this.reportRequestModel.TimePeriod = (0);
    //  this.reportRequestModel.SiteName =  localStorage.getItem('SiteName');
    //  this.reportRequestModel.ReportTitle = localStorage.getItem('VendorName');
    //  this.reportRequestModel.ReportType = 'Real time Report ';
    //  this.reportRequestModel.RequestedUser =  localStorage.getItem('username');
    //  this.dataSource =  new MatTableDataSource();
    }
      ngOnInit() {
        this.dashboardTableRequest = new DashboardTableRequestModel();
        this.SiteId = Number(localStorage.getItem('SiteId'));
        this.init();
      }


      init() {
        this.chatsss = Highcharts.stockChart(this.container.nativeElement, {
           rangeSelector: {
             selected : 0,
             inputEnabled: false,
             buttonTheme: {
               visibility: 'hidden'
           },

           labelStyle: {
             visibility: 'hidden'
         }
           },
           chart: {
             height: 600,
             zoomType: 'x'
           },
           credits: {
             enabled: false
         },
           mapNavigation: {
             enabled: true,
             enableButtons: false
         },
           legend: {
             enabled: true
           },


           plotOptions: {
             series: {
               showInLegend: true,
               marker: {
                 enabled: true,
                 radius: 3
             },
             events: {
               legendItemClick: function(event) {
                 const visibility = this.visible ? 'visible' : 'hidden';
                 return true;
                 this.chart.series.forEach(element => {

                   if (element.name.toUpperCase() === this.name.toUpperCase()) {
                     if (!this.visible) {
                       element = false;
                       element.show();
                   } else {
                     element.hidden = true;
                     element.hide();
                   }
                   }

             });

                 const seriesplotfilter = this.yAxis.plotLinesAndBands;

                 const check = this.yAxis.plotLinesAndBands.filter(model => model.id.toUpperCase() === this.name.toUpperCase())[0];
                 if (check != null) {

                   if (check.hidden) {
                     check.hidden = false;
                     check.svgElem.show();
                 } else {
                   check.hidden = true;
                   check.svgElem.hide();
                 }
               }
               return true;
               }
             },
             }
           },

           tooltip: {
             useHTML: true,
             followTouchMove: true,
             shared: true,
              split: false,
             outside: true,
             percentageDecimals: 2,
             crosshairs: false,
         animation: true,
         formatter: function() {
           const dates = new Date(this.x);
           dates.setMinutes(dates.getMinutes());
     let outputString = '<table bgcolor="#fff" border= "1 dotted"  style="border-collapse:collapse;background-color:#fff; border: 1px solid #DAD9D9 ;">';
     outputString += ' <tr><th style=\'background-color:#000;color: #DAD9D9\'; colspan=5>' + new Date(dates).toLocaleString() + '</th></tr>';
           this.points.forEach(function(point) {
             if (point.x === this.x) {
               const seriesame = (point.series.name).toUpperCase();
               const param = seriesame.split('-');
               const StackName = param[0] == null ? '' : param[0];
               const paramName = param.length > 1 ? param[1] : '';
               const paramUnits = param.length > 2 ? param[2] : '';
               outputString += '<tr><td><span style=\'color:' + point.color + '\'>\u25CF</span></td><td> ' + (StackName) + '</td><td>' + paramName + '</td><td>' + paramUnits + '</td><td> <b> ' + point.y + '</b></td></tr>';
             }
           }, this);
           return outputString += '</table>';
         }
       },


           series: [],

           yAxis: {
             min: 0,
             opposite: false,
             lineColor: '#000000',
             lineWidth: 1,
             title: {
                 text: 'Count'
             },
             plotLines: [

           ]
         },
           xAxis: {
             type: 'datetime',
             lineColor: '#000000',
             title: {
               text: 'DateTime'
           },
           dateTimeLabelFormats: {
             day: '%e of %b'
         },
             events: {
               afterSetExtremes: (e) => {
               }
             }
           },
         });




       }


       bindChartSeries(chartdata: any): any {

        const listofseries =  chartdata.length > 0 ? Object.keys( chartdata[0]) : [];
        //   listofseries.forEach(item => {
          listofseries.forEach(element => {
            if (element !== 'createdDate' && element !== 'id' ) {
            const seriesfilter = this.chatsss.series
            .filter(model => model.name === element)[0];
            if (seriesfilter == null) {
              const param = element.split('-');
              const StackName = param[0] == null ? '' : param[0];

              this.chatsss.addSeries({
                type: 'line',
                stackname: StackName,
                name: element,
                data: chartdata.map(function (point) {
                 const dates = new Date(point.createdDate);
                 dates.setMinutes(dates.getMinutes() );
               return [ dates.getTime(), point[element]];
               }),


                marker: {
                 enabled: true,
                 radius: 3
             },
                showInNavigator: true,
                softThreshold: true,
                zones: [
                  {
                    // value: element.threShholdValue
                  },
                  {
                    color: '#ff0000',
                     dashStyle: 'dot',
                  }
                ]
              });
             // this.AddPlotline(element);

            } else {
             // this.chatsss.series[0].addPoint([x, 10]);
            }

          }
        });

      }



      getCalibrationreport(stackId: number, paramId: number, row: any): void {
        this.DashboardQuickDataResposne = null;
        this.dashboardTableRequest = new DashboardTableRequestModel();
        this.dashboardTableRequest.siteId = this.SiteId;
        this.dashboardTableRequest.StackId = stackId;
        this.dashboardTableRequest.ParamId = paramId;
        this.dashboardTableRequest.fromDate = new Date();
        this.dashboardTableRequest.isFirst = true;
        this._dashboardService.getCalibrationreport(this.dashboardTableRequest).subscribe(
          resp => {
            if (resp.dataTable.length === 0) {

              return;
            }
            this.init();
              this.bindChartSeries(resp.dataTable);
              if (paramId !== 0) {
               // this.AddPlotline(row);
              }

          },
          error => {
            console.log('Error: ' + error);
          }
        );
      }


      // getcalibrationReport(): void {
      //   this.isLoading = true;
      //   this.CalibrationlogModel.IsExport = false;

      //   const Fromdates = _moment(this.CalibrationlogModel.FromDateVM).format('MM/DD/YYYY');
      //   const Todates = _moment(this.CalibrationlogModel.ToDateVM).format('MM/DD/YYYY');

      //   this.CalibrationlogModel.FromDate = _moment( Fromdates + ' ' + this.CalibrationlogModel.FromTimeVM).format(appConstants.DATE_Time_FORMAT);
      //   this.CalibrationlogModel.ToDate = _moment(Todates + ' ' + this.CalibrationlogModel.ToTimeVM).format(appConstants.DATE_Time_FORMAT);
      //   this._calibrationlogsServices.getcalibrationReport(this.CalibrationlogFilter).subscribe(resp => {
      //     this.chartdata = [];
      //     this.chartOptions = {};
      //     this.displayedColumns =  resp.model.length > 0 ? Object.keys( resp.model[0]) : [];

      //     if (resp.model.length > 0) {
      //                                 this.diableGridFilters = false;
      //                                 this.dataSource.data = resp.model;
      //                                 // this.dataSource.sort = this.sort;
      //                                 // this.dataSource.paginator = this.paginator;
      //                                 if (this.displayedColumns.length === 1) {
      //                                   this.showSnackBar('No data available ', true);
      //                                   this.isLoading = false;
      //                                   return;
      //                                 }
      //                                 // this.init();
      //                                 // this.chartdata = this.bindChartSeries(
      //                                 //   resp.model
      //                                 // );

      //                               } else {
      //                                 this.showSnackBar('No data available ', true); }
      //     this.isLoading = false;
      //   }, error => {
      //     this.isLoading = false;
      //     console.log('Error: ' + error);
      //   });
      // }

      // OnSearchClick(): void {
      //  this.getcalibrationReport();
      // }

      // OnExcelExportClick(): void {
      //   this.isLoading = true;
      //   this.CalibrationlogModel.IsExport = true;
      //   this._calibrationlogsServices.exportRealtimeReport(this.CalibrationlogFilter).subscribe(resp => {
      //     saveAs(resp, 'RealtimeReport.xlsx');
      //    // this.saveAsBlob(resp);
      //     this.isLoading = false;
      //     this.CalibrationlogModel.IsExport = false;
      //   }, error => {
      //     this.isLoading = false;
      //     this.CalibrationlogModel.IsExport = false;
      //     console.log('Error: ' + error);
      //   });

      // }
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
