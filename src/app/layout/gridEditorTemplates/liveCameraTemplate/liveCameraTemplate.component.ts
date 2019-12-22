// import { Component, OnInit, Inject, Pipe, PipeTransform , EventEmitter, Output} from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { CameraModel } from 'src/app/Model/ServiceResposeModel/Setups/CameraModel';
// import { MatDialog, MatTableDataSource } from '@angular/material';
// import { CameraService } from 'src/app/shared/services/Camera.service';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import * as Highcharts from 'highcharts/highstock';
// import {  ElementRef, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
// import { CameraFilter } from 'src/app/Model/FilterModels/CameraFilter';
// @Component({
//   selector: 'app-liveCameraTemplate',
//   templateUrl: './liveCameraTemplate.component.html',
//   styleUrls: ['./liveCameraTemplate.component.scss']
// })


// export class LiveCameraTemplateComponent implements OnInit {
//   cameraFilter: CameraFilter;
//   model:CameraModel;
//   Highcharts = Highcharts;
//   chatsss: any;
//   cameraRequest: CameraModel;
//   siteId: number;
//   IsFirst = true;
//  // cameraUrl: SafeResourceUrl;
//   CameraListDataSource: MatTableDataSource<CameraModel>;


// //   @Output()
// //   CameraEditorEmitter = new EventEmitter<any>();
//  cameraUrl: SafeResourceUrl;
//   rtpsUrl: string;
//   @ViewChild('container', { read: ElementRef , static: true }) container: ElementRef;
//   constructor(public dialogRef: MatDialogRef<LiveCameraTemplateComponent>, private _route: ActivatedRoute,  private router: Router,
//     @Inject(MAT_DIALOG_DATA) private data: any,
//     private _cameraservices: CameraService, public sanitizer: DomSanitizer,
//     private snackBar: MatSnackBar) {

//   this.cameraFilter = new CameraFilter();
//   this.model = data.model as  CameraModel;
//   this.cameraUrl = sanitizer.bypassSecurityTrustResourceUrl(data.model.rtpsUrl);


//   }


//   ngOnInit() {
//     this.getAllCameraList();
//   }
//   getAllCameraList(): void {

//     this._cameraservices.getAllCameraList(this.cameraFilter).subscribe(resp => {
//      this.CameraListDataSource.data = resp.model as CameraModel[];
//    }, error => {
//      console.log('Error: ' + error);
//    });
//  }

//  showSnackBar(message: string, isError: boolean = false): void {
//   if (isError) {
//     this.snackBar.open(message, 'Ok');
//   } else {
//     this.snackBar.open(message, 'Ok', {
//       duration: 3000
//     });
//   }
// }
// onCloseClick(): void {
//   this.dialogRef.close();
// }

//  }
import { Component, OnInit, Inject, Pipe, PipeTransform , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraModel } from '../../../Model/ServiceResposeModel/Setups/CameraModel';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CameraService } from '../../../shared/services/Camera.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import {  ElementRef, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CameraFilter } from '../../../Model/FilterModels/CameraFilter';
import * as _moment from 'moment';
import * as HC_exporting_ from 'highcharts/modules/exporting';
import { HighchartsChartModule } from 'highcharts-angular';
import { appConstants } from '../../../shared/Common/app-constants';
import { AppComponent } from '../../../app.component';
import { saveAs } from 'file-saver';
import { DashboardTableRequestModel } from '../../../Model/FilterModels/DashboardTableRequestModel';
import { DashboardQuickDataModel } from '../../../Model/ServiceResposeModel/Dashboard/DashboardQuickDataModel';
import { DashboardService } from '../../../shared/services/Dashboard.Services';
const HC_exporting = HC_exporting_;



@Component({
  selector: 'app-liveCameraTemplate',
  templateUrl: './liveCameraTemplate.component.html',
  styleUrls: ['./liveCameraTemplate.component.scss']
})


export class LiveCameraTemplateComponent implements OnInit {

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
   chartdata: any = [];
   isLoading = false;
   diableGridFilters = true;
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  options: any;
   chatsss: any;
   DashboardQuickDataResposne: DashboardQuickDataModel[] = [];
   cameraFilter: CameraFilter;
      model:CameraModel;
      cameraRequest: CameraModel;
     siteId: number;
      IsFirst = true;
     // cameraUrl: SafeResourceUrl;
     CameraListDataSource: MatTableDataSource<CameraModel>;
  @Output()
  CameraEditorEmitter = new EventEmitter<any>();
    cameraUrl: SafeResourceUrl;
    rtpsUrl: string;
  schedulerForm: FormGroup;
  isAdd = true;
 Selectedconfg_id: bigint ;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
  SelectedvendorsiteId: bigint;
  editModel: CameraModel;
  CameraFilter: CameraFilter;


  @ViewChild('container', { read: ElementRef , static: true }) container: ElementRef;
  constructor(public dialogRef: MatDialogRef<LiveCameraTemplateComponent>,
    private _dashboardService: DashboardService,
    private _cameraServices: CameraService,

    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
         private _cameraservices: CameraService, public sanitizer: DomSanitizer,
     private snackBar: MatSnackBar) {
      this.CameraFilter = new CameraFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as CameraModel );
       this.Selectedconfg_id = this.editModel.confgId;
      }
      this.getDashboardChartData(881, 39, null);
      this.cameraFilter = new CameraFilter();
        this.model = data.model as  CameraModel;
         this.cameraUrl = sanitizer.bypassSecurityTrustResourceUrl(data.model.rtpsUrl);
    }
      ngOnInit() {
        this.dashboardTableRequest = new DashboardTableRequestModel();
        this.SiteId = Number(localStorage.getItem('SiteId'));
        this.init();
        this.getAllCameraList();
      }
      getAllCameraList(): void {

             this._cameraservices.getAllCameraList(this.cameraFilter).subscribe(resp => {
              this.CameraListDataSource.data = resp.model as CameraModel[];
           }, error => {
             console.log('Error: ' + error);
            });
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



      getDashboardChartData(stackId: number, paramId: number, row: any): void {
        this.DashboardQuickDataResposne = null;
        this.dashboardTableRequest = new DashboardTableRequestModel();
        this.dashboardTableRequest.siteId = this.SiteId;
        this.dashboardTableRequest.StackId = stackId;
        this.dashboardTableRequest.ParamId = paramId;
        this.dashboardTableRequest.fromDate = new Date();
        this.dashboardTableRequest.isFirst = true;
        this._dashboardService.getDashboarChart(this.dashboardTableRequest).subscribe(
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

      showSnackBar(message: string, isError: boolean = false): void {
        if (isError) {
          this.snackBar.open(message, 'Ok');
        } else {
          this.snackBar.open(message, 'Ok', {
            duration: 3000
          });
        }
      }
      onCloseClick(): void {
           this.dialogRef.close();
         }
    }
