import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ReportsService } from 'src/app/shared/services/report.services';
import { ActivatedRoute } from '@angular/router';

import * as Highcharts from 'highcharts/highstock';
// const IndicatorsCore = require('highcharts/indicators/indicators');
// IndicatorsCore(Highcharts);
// const IndicatorZigZag = require('highcharts/indicators/zigzag');
// IndicatorZigZag(Highcharts);

import * as HC_exporting_ from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { ReportRequestModel } from '../../../Model/Report/ReportRequestModel';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
const HC_exporting = HC_exporting_;
HC_exporting(Highcharts);




@Component({
  selector: 'app-AverageReport',
  templateUrl: './AverageReport.component.html',
  styleUrls: ['./AverageReport.component.scss']
})

export class AverageReportComponent implements OnInit , AfterViewInit {
  Highcharts = Highcharts;
   updateFlag = true;
   reportRequestModel: ReportRequestModel;
   stacksArray: ReferenceRecords[] = [];
   paramArray: ReferenceRecords[] = [];
   sitesArray:  ReferenceRecords[] = [];
   chartOptions: any;
   parameterFilter: ParameterFilter;
   SiteId: number ;
    // fromDate = new FormControl(new Date());
    // toDate = new FormControl((new Date()).toISOString());


  displayedColumns = [];
  dataSource: MatTableDataSource<any>;
  options: any;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   @ViewChild('charts', { static: false }) public chartEl: ElementRef;
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _reportservices: ReportsService,
    private snackBar: MatSnackBar) {
      this.reportRequestModel = new ReportRequestModel();
      this.parameterFilter =  new ParameterFilter();
      this.SiteId = _appcomponent.SiteId;
      this.reportRequestModel.FromDate = (new Date()).toISOString();
      this.reportRequestModel.ToDate = (new Date()).toISOString();
      this.reportRequestModel.StackId  = 0;
      this.reportRequestModel.ParamId = 0;
    _appcomponent.currenturl = '/Paramsetup';
    this.dataSource =  new MatTableDataSource();

  }
  ngOnInit() {

    this.reportRequestModel.SiteId = 1 ;

     this. getAllStacks();
     this.getAllParameterList(0);
     this.getSites();



   // this.getAverageReport();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

   initChart( chartdata: any) {
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },


      chart: {
        zoomType: 'x',
        events: {
            addSeries: function () {
                alert('A series was added');
            }
        }
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
        text: 'Live Report'
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          showInLegend: true
        }
      },
      series: chartdata,
      // xAxis: {
      //   type: 'datetime',
      //   labels: {
      //     formatter: function() {
      //       return Highcharts.dateFormat('%a %d %b', this.value);
      //     }
      //   }
      // },
      // series: [
      //   {
      //   name: 'CO',
      //   marker: {
      //     enabled: true,
      //     radius: 3
      // },
      //    showInNavigator: true,
      //    data: chartdata.map(function (point) {
      //   return [ new Date(point.createdDate).getTime(), point.co];
      //   })},
      //   {
      //   name: 'CO2',
      //   marker: {
      //     enabled: true,
      //     radius: 3
      // },
      //    showInNavigator: true,
      //    data: chartdata.map(function (point) {
      //   return [ new Date(point.createdDate).getTime(), point.co2];
      //   }
      //   )}, {
      //   name: 'NOX',
      //   marker: {
      //     enabled: true,
      //     radius: 3
      // },
      //    showInNavigator: true,
      //   data: chartdata.map(function (point) {
      //   return [ new Date(point.createdDate).getTime() , point.nox];
      //   })
      //   }]
    //   series: [
    //     {
    //       type: 'line',
    //       id: 'aapl',
    //       name: 'AAPL Stock Price',
    //       data: [
    //         [1528983000000, 191.55],
    //         [1529069400000, 190.03],
    //         [1530019800000, 502.99],
    //         [1532698200000, 194.99],
    //         [1538662700000, 100.78]
    //       ]
    //     }
    //     // {
    //     //   type: "zigzag",
    //     //   linkedTo: "aapl"
    //     // },
    //     // {
    //     //   type: "zigzag",
    //     //   linkedTo: "aapl",
    //     //   params: {
    //     //     deviation: 5
    //     //   }
    //     // }
    //  ]
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
        //  data: [
        //           [1528983000000, 191.55],
        //           [1529069400000, 190.03],
        //           [1530019800000, 502.99],
        //           [1532698200000, 194.99],
        //           [1538662700000, 100.78]
        //         ]
           data: chartdata.map(function (point) {


           return [ new Date(point.createdDate).getTime(), point[item]];
           })
        };
         _series.push(singleseries);
        }
   });
   return _series;
  }
  getAverageReport(): void {
    this._reportservices.getAverageReport(this.reportRequestModel).subscribe(resp => {

      this.displayedColumns =  resp.model.length > 0 ? Object.keys( resp.model[0]) : [];
      this.dataSource.data = (resp.model);
       const chartjosndata = this.bindChartSeries(resp.model);
      this.initChart(chartjosndata);

    }, error => {
      console.log('Error: ' + error);
    });
  }

  OnSearchClick(): void {
   this.getAverageReport();
  }
}
