import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ReportsService } from 'src/app/shared/services/report.services';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import * as Highcharts from 'highcharts/highstock';
// const IndicatorsCore = require('highcharts/indicators/indicators');
// IndicatorsCore(Highcharts);
// const IndicatorZigZag = require('highcharts/indicators/zigzag');
// IndicatorZigZag(Highcharts);

import * as HC_exporting_ from 'highcharts/modules/exporting';
import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
const HC_exporting = HC_exporting_;
HC_exporting(Highcharts);
@Component({
  selector: 'app-RealtimeReport',
  templateUrl: './RealtimeReport.component.html',
  styleUrls: ['./RealtimeReport.component.scss']
})

export class RealtimeReportComponent implements OnInit , AfterViewInit {
  Highcharts = Highcharts;
   updateFlag = true;
   reportRequestModel: ReportRequestModel;
   stacksArray: ReferenceRecords[] = [];
   paramArray: ReferenceRecords[] = [];
   sitesArray:  ReferenceRecords[] = [];
   chartOptions: any;
   parameterFilter: ParameterFilter;
   SiteId: number ;
   chartdata: any = [];
   isLoading = false;
   diableGridFilters = true;

  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  options: any;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //  @ViewChild('charts', { static: false }) public chartEl: ElementRef;
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _reportservices: ReportsService,
    private snackBar: MatSnackBar) {
      this.reportRequestModel = new ReportRequestModel();
      this.parameterFilter =  new ParameterFilter();
      this.SiteId = _appcomponent.SiteId;
      this.reportRequestModel.FromDate = (new Date());
      this.reportRequestModel.ToDate = (new Date());
      this.reportRequestModel.StackId  = 0;
      this.reportRequestModel.ParamId = 0;
      this.reportRequestModel.IsExport = false;
      this.reportRequestModel.SiteCode = 'MHBP';

      this.reportRequestModel.SiteName = 'MHBP';
      this.reportRequestModel.ReportTitle = 'Vasthi';
      this.reportRequestModel.ReportType = 'Real time Report ';
      this.reportRequestModel.RequestedUser = 'Ganga';

    _appcomponent.currenturl = '/Paramsetup';
    this.dataSource =  new MatTableDataSource();

  }
  ngOnInit() {

    this.reportRequestModel.SiteId = 1 ;

     this. getAllStacks();
     this.getAllParameterList(0);
     this.getSites();



    this.getRealtimeReport();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {

  }
  getAllStacks(): void {
    this._reportservices.getAllStacks(0, true).subscribe(resp => {
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

   initChart() {
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },


      chart: {
        zoomType: 'x',
        // events: {
        //     addSeries: function () {
        //         alert('A series was added');
        //     }
        // }
    },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right"><b>{point.y}</b> {point.extraForTooltip}</td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
      },
      exporting: {
        chartOptions: {
          // specific options for the exported image
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true
              }
            }
          }
        },
        fallbackToExportServer: false
      },
      title: {
        text: 'Live Chart'
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          showInLegend: true
        }
      },
      series: this.chartdata,

    };

   }
   bindChartSeries(chartdata: any): any {
    const _series = [];
    const x = new Date().getTime();
    this.displayedColumns.forEach(item => {
       if (item !== 'createdDate' && item !== 'id' ) {
      const singleseries =  {
          name: item,
          marker: {
            enabled: true,
             radius: 3
         },
         showInNavigator: true,
           data: chartdata.map(function (point) {
           return [ new Date(point.createdDate).getTime(), point[item]];
           })
        };
         _series.push(singleseries);
        }
   });
   return _series;
  }
  getRealtimeReport(): void {
    this.isLoading = true;
    this.reportRequestModel.IsExport = false;
    this._reportservices.getRealtimeReport(this.reportRequestModel).subscribe(resp => {
      this.chartdata = [];
      this.chartOptions = {};
      this.displayedColumns =  resp.model.length > 0 ? Object.keys( resp.model[0]) : [];
      if (resp.model.length > 0) {
                                  this.diableGridFilters = false;
                                  this.dataSource.data = resp.model;
                                  this.dataSource.sort = this.sort;
                                  this.dataSource.paginator = this.paginator;
                                  this.chartdata = this.bindChartSeries(
                                    resp.model
                                  );
                                  this.initChart();
                                }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log('Error: ' + error);
    });
  }

  OnSearchClick(): void {
   this.getRealtimeReport();
  }

  OnExcelExportClick(): void {
    this.isLoading = true;
    this.reportRequestModel.IsExport = true;
    this._reportservices.exportRealtimeReport(this.reportRequestModel).subscribe(resp => {
      saveAs(resp, 'AverageReport.xlsx');
     // this.saveAsBlob(resp);
      this.isLoading = false;
      this.reportRequestModel.IsExport = false;
    }, error => {
      this.isLoading = false;
      this.reportRequestModel.IsExport = false;
      console.log('Error: ' + error);
    });

  }

}
