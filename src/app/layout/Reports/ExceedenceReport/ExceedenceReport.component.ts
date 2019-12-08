import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ReportsService } from 'src/app/shared/services/report.services';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import * as Highcharts from 'highcharts/highstock';
import * as _moment from 'moment';

import * as HC_exporting_ from 'highcharts/modules/exporting';
import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
const HC_exporting = HC_exporting_;
HC_exporting(Highcharts);
import MapModule from 'highcharts/modules/map';
import { appConstants } from 'src/app/shared/Common/app-constants';
MapModule(Highcharts);
@Component({
  selector: 'app-ExceedenceReport',
  templateUrl: './ExceedenceReport.component.html',
  styleUrls: ['./ExceedenceReport.component.scss']
})

export class ExceedenceReportComponent implements OnInit , AfterViewInit {

  SelectedView: string;
  Viewtypes = [
    {
      key: 'Graph View',
      checked: false
    },
    {
      key: 'Table View',
      checked: true
    }];
  Highcharts = Highcharts;
   updateFlag = true;
   IsGraphView = false;
   reportRequestModel: ReportRequestModel;
   stacksArray: ReferenceRecords[] = [];
   paramArray: ReferenceRecords[] = [];
   sitesArray:  ReferenceRecords[] = [];
   timePeriodArray:  ReferenceRecords[] = [];
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
  //  @ViewChild('charts', { static: false }) public chartEl: ElementRef;
  constructor(private _dialog: MatDialog,  private _route: ActivatedRoute,
    private _reportservices: ReportsService,
    private snackBar: MatSnackBar) {
      this.SelectedView = 'Table View';

    // **As well as this**

      this.reportRequestModel = new ReportRequestModel();
      this.parameterFilter =  new ParameterFilter();
      this.reportRequestModel.SiteId = Number(localStorage.getItem('SiteId'));
      this.reportRequestModel.FromDateVM = (new Date());
      this.reportRequestModel.FromTimeVM = '00:00';
      this.reportRequestModel.ToTimeVM = '23:59';
      this.reportRequestModel.ToDateVM = (new Date());
      this.reportRequestModel.StackId  = 0;
      this.reportRequestModel.ParamId = 0;
      this.reportRequestModel.IsExport = false;
      this.reportRequestModel.SiteCode = localStorage.getItem('SiteName');
      this.reportRequestModel.TimePeriod = (0);
      this.reportRequestModel.SiteName =  localStorage.getItem('SiteName');
      this.reportRequestModel.ReportTitle = localStorage.getItem('VendorName');
      this.reportRequestModel.ReportType = 'Exceedence Report ';

      this.reportRequestModel.RequestedUser =  localStorage.getItem('username');
        localStorage.setItem('currentUrl', '/AverageReport');

    this.dataSource =  new MatTableDataSource();

  }
  ngOnInit() {
    this.getSites();
     this. getAllStacks();
     this.getAllParameterList(this.reportRequestModel.StackId);

     this.gettimePeriod();
   //  this.reportRequestModel.TimePeriod = this.timePeriodArray[0].id;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    this.getAverageReport();

  }
  getAllStacks(): void {
    this._reportservices.getSiteStacks( this.reportRequestModel.SiteId, this.reportRequestModel.StackId, true).subscribe(resp => {
      this.stacksArray = resp.model as ReferenceRecords[];
      this.reportRequestModel.StackId = Number(this.stacksArray[0].id);
    }, error => {
      console.log('Error: ' + error);
    });
  }

   gettimePeriod(): void {

    this._reportservices.getReferencerecords(17, false).subscribe(resp => {
      this.timePeriodArray = resp.model as ReferenceRecords[];
    }, error => {
      console.log('Error: ' + error);
    });
   }

   radioViewChange(selectedView: any) {
    if (selectedView.value === 'Graph View') {
   this.IsGraphView = true;
    } else {
      this.IsGraphView = false;
    }
   }

  getSites(): void {
    this._reportservices.getAllSites( this.reportRequestModel.SiteId, false).subscribe(resp => {
      this.sitesArray = resp.model as ReferenceRecords[];
    }, error => {
      console.log('Error: ' + error);
    });
  }


  getAllParameterList(stackcId: number): void {

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


    credits: {
      enabled: false
  },
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
      height: 800,
      zoomType: 'x'
    },

    mapNavigation: {
      enabled: true,
      enableButtons: false
  },


    yAxis: {

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
          // console.log(e);
          // this.button = e.rangeSelectorButton.count;

        }
      }
    },
    tooltip: {
      useHTML: true,
      followTouchMove: true,
      split: false,
      shared: true,
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
        const paramName = param.length > 1 ? param[1] :'';
        const paramUnits = param.length > 2 ? param[2] :'';
        outputString += '<tr><td><span style=\'color:' + point.color + '\'>\u25CF</span></td><td> ' + (StackName) + '</td><td>'+paramName+'</td><td>' + paramUnits + '</td><td> <b> ' + point.y + '</b></td></tr>';
      }
    }, this);
    return outputString += '</table>';
  }
},
      exporting: {
        chartOptions: {

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
        text: 'Chart'
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
             const dates = new Date(point.createdDate);
             dates.setMinutes(dates.getMinutes() + 330);
           return [ dates.getTime(), point[item]];
           })
        };
         _series.push(singleseries);
        }
   });
   return _series;
  }
  getAverageReport(): void {
    this.isLoading = true;
    this.reportRequestModel.IsExport = false;
    const Fromdates = _moment(this.reportRequestModel.FromDateVM).format("MM/DD/YYYY");
    const Todates = _moment(this.reportRequestModel.ToDateVM).format("MM/DD/YYYY");

    this.reportRequestModel.FromDate = _moment( Fromdates + ' ' + this.reportRequestModel.FromTimeVM).format(appConstants.DATE_Time_FORMAT);
    this.reportRequestModel.ToDate = _moment(Todates + ' '+ this.reportRequestModel.ToTimeVM).format(appConstants.DATE_Time_FORMAT);

    this._reportservices.getExceedenceReport(this.reportRequestModel).subscribe(resp => {
      this.isLoading = false;
      this.chartdata = [];
      this.chartOptions = {};
      this.displayedColumns =  resp.model.length > 0 ? Object.keys( resp.model[0]) : [];

      if (resp.model.length > 0) {
                                  this.diableGridFilters = false;
                                  this.dataSource.data = resp.model;
                                  this.dataSource.sort = this.sort;
                                  this.dataSource.paginator = this.paginator;
                                  if (this.displayedColumns.length === 1) {
                                    this.showSnackBar('No data available ', true);
                                    return;
                                  } else {
                                  this.chartdata = this.bindChartSeries(
                                    resp.model
                                  );
                                  this.initChart();
                                  }
                                }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log('Error: ' + error);
    });
  }

  OnSearchClick(): void {
   this.getAverageReport();
  }

  OnExcelExportClick(): void {
    this.isLoading = true;
    this.reportRequestModel.IsExport = true;
    this._reportservices.exportExceedingtimeReport(this.reportRequestModel).subscribe(resp => {
      saveAs(resp, 'ExceedenceReport.xlsx');
     // this.saveAsBlob(resp);
      this.isLoading = false;
      this.reportRequestModel.IsExport = false;
    }, error => {
      this.isLoading = false;
      this.reportRequestModel.IsExport = false;
      console.log('Error: ' + error);
    });

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

