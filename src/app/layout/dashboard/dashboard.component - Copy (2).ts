import { Component, Optional, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DashboardQuickCounts } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickCounts';
import { DashboardService } from 'src/app/shared/services/Dashboard.Services';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { DashboardQuickDataModel } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickDataModel';
import { DashboardTableRequestModel } from 'src/app/Model/FilterModels/DashboardTableRequestModel';
import * as Highcharts from 'highcharts/highstock';
// const IndicatorsCore = require('highcharts/indicators/indicators');
// IndicatorsCore(Highcharts);
// const IndicatorZigZag = require('highcharts/indicators/zigzag');
// IndicatorZigZag(Highcharts);

import * as HC_exporting_ from 'highcharts/modules/exporting';
const HC_exporting = HC_exporting_;
HC_exporting(Highcharts);
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { interval, Subscription } from 'rxjs';

export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

const ELEMENT_DATA: (DashboardQuickDataModel | GroupBy)[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {


  dashboardQuickCounts: DashboardQuickCounts;
  stackCount: number;
  paramCount: number;
  exceedenceCount: number;
  alertCount: number;
  dashboardTableRequest: DashboardTableRequestModel;
  siteId: number;
  Highcharts = Highcharts;
   chatsss: any;
  updateFlag = true;
  subscription: Subscription;
  DashboardQuickDataResposne: DashboardQuickDataModel[] = [];



  chartOptions = {
    rangeSelector: {
      selected: 1
    },

    chart: {
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
      text: 'AAPL Stock Price'
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      series: {
        showInLegend: true
      }
    },
    series: [
      {
        type: 'line',
        id: 'aapl',
        name: 'AAPL Stock Price',
        data: [
          [1528983000000, 191.55],
          [1529069400000, 190.03],
          [1530019800000, 502.99],
          [1532698200000, 194.99],
          [1538662700000, 100.78]
        ]
      }
      // {
      //   type: "zigzag",
      //   linkedTo: "aapl"
      // },
      // {
      //   type: "zigzag",
      //   linkedTo: "aapl",
      //   params: {
      //     deviation: 5
      //   }
      // }
   ]
  };
  @ViewChild("container", { read: ElementRef , static: true }) container: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
 
  constructor(
    private _dialog: MatDialog,
    private _appcomponent: AppComponent,
    private _route: ActivatedRoute,
    private _dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {
    _appcomponent.currenturl = '/dashboard';
  }

  displayedColumns = ['stackName', 'paramName', 'paramUnits', 'paramValue', 'recordedDate', 'threShholdValue'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.dashboardTableRequest = new DashboardTableRequestModel();
    this.siteId = this._appcomponent.SiteId;
    this.init();
    this.getDashboardQuickCounts();
    this.getDashboardQuickTableList();
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.getDashboardQuickTableList());
  }
  addPoint() {
    const x = new Date().getTime();
    // const shift = this.chart.ref.series[0].data.length > 100000000;
    // if (this.chart) {
    //   if (true) {
    //     //  region
    //     // this.chart.addPoint(Math.floor(Math.random() * 10));
    //     //  this.chart.ref.series[0].addPoint(20)
    //     //  endregion
    //     // element.addPoint(Math.random() * 10);
    //   }
    //   this.chart.ref.series.forEach(element => {
    //     if (this.DashboardQuickDataResposne != null) {
    //       const result = this.DashboardQuickDataResposne.filter(model => model.paramName + '-' + model.stackName === element.name)[0];

    //       element.addPoint([x, result.paramValue], true, shift, false);
    //     }
    //   });
    // } else {
    //   alert('init chart, first!');
    // }
  }

  addSerie() {
    this.DashboardQuickDataResposne.forEach(element => {


      if (element.paramName != null) {


        // if (this.chartOptions.series == null) {
        //   this.chartOptions.series = [];
        const seriesfilter = this.chatsss.series.filter(model => model.name === element.paramName )[0];//+ '-' + element.stackName)[0];
              if (seriesfilter == null) {
                              this.chatsss.addSeries({
                                name: element.paramName,
                                data: [
                                  [1528983000000, 191.55],
                                  [1529069400000, 30.03],
                                  [1530019800000, 12.99],
                                  [1532698200000, 194.99],
                                  [1538662700000, 10.78]
                                ],
                              });
                            }


        // this.chatsss.series.addSeries({
        //     name: 'AAPL Stock Price ganga',
        //     data: []
        // });
      this.updateFlag = true;
         // const seriesfilter = this.chartOptions.series.filter(model => model.name === element.paramName + '-' + element.stackName)[0];
       // }

      //   const result = this.chart.ref.series.filter(model => model.name === element.paramName + '-' + element.stackName)[0];
      //   if (result == null) {
      //     this.chart.addSerie({
      //       name: element.paramName + '-' + element.stackName,
      //       threshold: 1,
      //       data: [
      //       //   {
      //       //   'Sowing Area': "4500 H",
      //       //   "Plots Audited": "1200 H"
      //       // }
      //     ],
      //     keys: ['x', 'y', 'extraForTooltip'],
      //       softThreshold: true,
      //       id: element.configId.toString(),
      //       zones: [{
      //         value: element.threShholdValue
      //     },
      //     {
      //       color: '#ff0000',
      //       // dashStyle: 'dot',
      //   },
      // ]
      //     });
      //   }
      }
    });
  }
  removePoint() {
    // this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
   //  this.chart.removeSerie(this.chart.ref.series.length - 1);
  }

  init() {

   this.chatsss = Highcharts.stockChart(this.container.nativeElement, {
      rangeSelector: {
        buttons: [{
          type: 'month',
          count: 1,
          text: '1m',
          events: {
            click: function (e) {
              console.log('button clickd');
            }
          }
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'ytd',
          text: 'YTD'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All1'
        }]
      },
      chart: {
        zoomType: 'x'
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          showInLegend: true
        }
      },
      series: [{
        name: 'AAPL',
        data: [
          [1528983000000, 191.55],
          [1529069400000, 190.03],
          [1530019800000, 502.99],
          [1532698200000, 194.99],
          [1538662700000, 100.78]
        ],
        tooltip: {
          valueDecimals: 2
        }
      }],
      xAxis: {
        events: {
          afterSetExtremes: (e) => {
            // console.log(e);
            // this.button = e.rangeSelectorButton.count;

          }
        }
      },
    });




  }



  isGroup(index, item): boolean {
    return item.isGroupby;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDashboardQuickCounts(): void {
    this.dashboardTableRequest.siteId = this._appcomponent.SiteId;
    this._dashboardService.getDashboardQuickCounts(this.dashboardTableRequest).subscribe(
      resp => {
        this.dashboardQuickCounts = resp.model as DashboardQuickCounts;
        this.stackCount = this.dashboardQuickCounts.stackCount;
        this.paramCount = this.dashboardQuickCounts.paramCount;
        this.exceedenceCount = this.dashboardQuickCounts.exceedenceCount;
        this.alertCount = this.dashboardQuickCounts.alertCount;
      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }
  getDashboardQuickTableList(): void {
    this.DashboardQuickDataResposne = null;
    this.dashboardTableRequest = new DashboardTableRequestModel();
    this.dashboardTableRequest.siteId = 1;
    this.dashboardTableRequest.fromDate = new Date();
    this._dashboardService.getDashboardQuickTableData(this.dashboardTableRequest).subscribe(
      resp => {
        this.DashboardQuickDataResposne = resp.model as DashboardQuickDataModel[];
        this.dataSource.data = resp.model as DashboardQuickDataModel[];
        this.addSerie();
        this.addPoint();
      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }

  SelectedrowDrawCharts(row: DashboardQuickDataModel) {
    this.showAllSeries();
    // this.chart.ref.series.forEach(element => {
    //   if (row != null) {
    //     if  (row.paramName + '-' + row.stackName !== element.options.name) {
    //       element.hide();
    //     }
    //   }
    // });
  }

  SelectedGroupDrawCharts(row: DashboardQuickDataModel) {
    this.showAllSeries();
    // this.chart.ref.series.forEach(element => {
    //   if (row != null) {
    //     if  (row.configId.toString() !== element.options.id) {
    //       element.hide();
    //     }
    //   }
    // });
  }

  showAllSeries(): void  {
    // this.chart.ref.series.forEach(element => {
    //       element.show();
    // });
  }
}
