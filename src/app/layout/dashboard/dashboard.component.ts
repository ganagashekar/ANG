import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DashboardQuickDataModel } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickDataModel';
import { DashboardTableRequestModel } from 'src/app/Model/FilterModels/DashboardTableRequestModel';
import * as Highcharts from 'highcharts/highstock';

import * as HC_exporting_ from 'highcharts/modules/exporting';
const HC_exporting = HC_exporting_;
HC_exporting(Highcharts);
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { interval, Subscription } from 'rxjs';
import { OnInit, ElementRef, ViewChild, AfterViewInit, Component } from '@angular/core';
import { DashboardQuickCounts } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickCounts';
import { DashboardService } from 'src/app/shared/services/Dashboard.Services';

import MapModule from 'highcharts/modules/map';

MapModule(Highcharts);

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





  @ViewChild('container', { read: ElementRef , static: true }) container: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _dashboardService: DashboardService,
    private snackBar: MatSnackBar) {

      localStorage.setItem('currentUrl', '/dashboard');

  }

  displayedColumns = ['paramName', 'paramUnits', 'paramValue', 'threShholdValue', 'paramminvalue', 'parammaxvalue', 'recordedDate', ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.dashboardTableRequest = new DashboardTableRequestModel();
    this.siteId = Number(localStorage.getItem('SiteId'));
    this.init();
    this.getDashboardQuickCounts();
    this.getDashboardQuickTableList();
    // const source = interval(5000);
    // this.subscription = source.subscribe(val => this.getDashboardQuickTableList());
  }
  addPoint() {
    const x = new Date().getTime();
    const shift = this.chatsss.series[0].data.length > 100000000;
    if (this.chatsss) {
      if (true) {
        //  region
        // this.chart.addPoint(Math.floor(Math.random() * 10));
        //  this.chart.ref.series[0].addPoint(20)
        //  endregion
        // element.addPoint(Math.random() * 10);
      }
      this.chatsss.series.forEach(element => {
        if (this.DashboardQuickDataResposne != null) {

          const result = this.DashboardQuickDataResposne.filter(x => x.paramName != null)
          .filter(model => model.paramName  + '-' + model.stackName === element.name )[0];
              if (result != null && result.paramValue !== undefined) {
                element.addPoint([x, result.paramValue]);
              }
        }
      });
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    const x = new Date().getTime();
               this.DashboardQuickDataResposne.forEach(element => {
                 if (element.paramName != null) {
                   const seriesfilter = this.chatsss.series
                   .filter(model => model.name === element.paramName + '-' + element.stackName)[0];
                   if (seriesfilter == null) {

                     this.chatsss.addSeries({
                       type: 'line',
                      id: element.configId,
                       name: element.paramName + '-' + element.stackName,
                       data: [
                         [x, element.paramValue]
                       ],
                       marker: {
                        enabled: true,
                        radius: 3
                    },
                       showInNavigator: true,
                       softThreshold: true,
                       zones: [
                         {
                           value: element.threShholdValue
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
  removePoint() {
    // this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
   //  this.chart.removeSerie(this.chart.ref.series.length - 1);
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
        zoomType: 'x'
      },
      credits: {

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
          legendItemClick: function() {
            return true;
          }
        },
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f} TWh</b></td></tr>' +
            '<tr><td>Indikator : </td>' +
            '<td><b>x %</b></td></tr>',
        footerFormat: '</table> ',
        shared: true,
        useHTML: true
    },
  //     tooltip: {
  //       shared: true,
  //       crosshairs: true,
  //   animation: true,
  //   formatter: function() {
	// 		return this.x + '<br>'
	// 		+ this.points[0].series.name + ': ' + this.points[0].y + '<br>'
	// 		+ this.points[1].series.name + ': ' + this.points[1].y;
  //   }
  // },

        // useHTML: true,
        // crosshairs: true,
        // enabled: true,
        // headerFormat: '<small>{point.key}</small><table>',
        // pointFormat:
        //   '<tr><td style="color: {series.color}">{series.name}: </td>' +
        //   '<td style="text-align: right"><b>{point.y}</b> {point.extraForTooltip}</td></tr>',
        // footerFormat: '</table>',
      //   valueDecimals: 2
      // },
      series: [],

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
        lineColor: '#000000',
        title: {
          text: 'DateTime'
      },

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
    this.dashboardTableRequest.siteId = Number(localStorage.getItem('SiteId'));
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
    this.dashboardTableRequest.siteId = this.siteId;
    this.dashboardTableRequest.fromDate = new Date();
    this._dashboardService.getDashboardQuickTableData(this.dashboardTableRequest).subscribe(
      resp => {
        if (resp.model.length === 0) {
          this.showSnackBar('No data available ', true);
          return;
        }
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
    this.chatsss.series.forEach(element => {
      if (row != null) {
        if  (row.paramName + '-' + row.stackName !== element.options.name) {
          element.hide();
        }
    }
    });
   // this.RemovePlotline(row);
    this.AddPlotline(row);
  }

  AddPlotline(row: DashboardQuickDataModel): void {
    const plotOption = {

      color: '#FF0000',
      dashStyle: 'ShortDash',
      width: 2,
      zIndex: 9999,
      visible: 'hide',
      id:  row.paramName + '-' + row.stackName + ' Threshhold',
      value: row.threShholdValue,
      // zIndex: 0,
      label : {
          text : row.paramName + '-' + row.stackName + ' Threshhold'
      }
  };
  // this.chatsss.yAxis[0].removePlotLine(row.paramName + '-' + row.stackName + ' Threshhold');
    this.chatsss.yAxis[0].addPlotLine(plotOption) ;
  }

  RemovePlotline(): void {

    this.chatsss.yAxis[0].plotLinesAndBands.forEach(item => {
       // if  (row.paramName + '-' + row.stackName + ' Threshhold' !== item.options.id) {
          item.destroy();
       // }

    });

  }

  SelectedGroupDrawCharts(row: DashboardQuickDataModel) {
    this.showAllSeries();
    this.chatsss.series.forEach(element => {
      if (element.id !== row.paramName + '-' + row.stackName + ' Threshhold') {

      if (row != null) {
        if  (row.configId.toString() !== element.options.id.toString()) {
          element.zindex = 999;
        }
      }
    }
    });
  }

  showAllSeries(): void  {

    this.RemovePlotline();
    this.chatsss.series.forEach(element => {
          element.show();
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
