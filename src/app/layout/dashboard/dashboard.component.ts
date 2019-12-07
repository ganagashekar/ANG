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

  IsFirst = true;
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
    const source = interval(30000);
    this.subscription = source.subscribe(val => this.getDashboardQuickTableList());
  }
  addPoint() {
    const x = new Date().getTime();
    const shift = this.chatsss.series[0].data.length > 100000000;
    if (this.chatsss) {
      
      this.chatsss.series.forEach(element => {
        if (this.DashboardQuickDataResposne != null) {

          const result = this.DashboardQuickDataResposne.filter(x => x.paramName != null)
          .filter(model => model.chartSeriesName.toUpperCase() === element.name.toUpperCase() )[0];
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
                   .filter(model => model.name.toUpperCase() === element.chartSeriesName.toUpperCase())[0];
                   if (seriesfilter == null) {

                     this.chatsss.addSeries({
                       type: 'line',
                      id: element.configId,
                       name: element.chartSeriesName,
                       data: [
                         [x, element.paramValue]
                       ],
                       marker: {
                        enabled: true,
                        radius: 3
                    },

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
                     this.AddPlotline(element);

                   } else {
                    seriesfilter.id = element.configId;
                    this.AddPlotline(element);
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
        height: 550,
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
          legendItemClick: function(event) {
            var visibility = this.visible ? 'visible' : 'hidden';
            return true;
            this.chart.series.forEach(element => {

              if(element.name.toUpperCase() == this.name.toUpperCase()){
                if (!this.visible) {
                  element = false;
                  element.show();
              } else {
                element.hidden = true;
                element.hide();
              }
              }
            
        });
            // if (!confirm('The series is currently '+ 
            //              visibility +'. Do you want to change that?')) {
            //     return false;
            // }
            const seriesplotfilter = this.yAxis.plotLinesAndBands;
            //.filter(model => model.id == row.paramName + '-' + row.stackName + ' Threshhold')[0];
            const check = this.yAxis.plotLinesAndBands.filter(model => model.id.toUpperCase() == this.name.toUpperCase())[0];
            if(check != null) {
  
              if (check.hidden) {
                check.hidden = false;
                check.svgElem.show();
            } else {
              check.hidden = true;
              check.svgElem.hide();
            }

             // check.svgElem[ el.visible ? 'show' : 'hide' ]();
            // check[ el.visible ? 'show' : 'hide' ]();
            // el.visible = !el.visible;
            //  check.svgElem.visibility = this.visible;
            // check.axis.visibility = this.visible;
            // check.svgElem.visibility = this.visible;
          }
          return true;
          }
        },
        }
      },

      tooltip: {
        useHTML: true,
        shared: true,
        crosshairs: true,
    animation: true,
    formatter: function() {
      var outputString = '<table bgcolor="#fff" border= "1 dotted"  style="border-collapse:collapse;background-color:#fff; border: 1px solid #DAD9D9 ;">';
      outputString +=" <tr><th style='background-color:#000;color: #DAD9D9'; colspan=5>" + new Date(this.x).toLocaleString() + "</th></tr>";
      this.points.forEach(function(point) {
        if (point.x === this.x) {
          const seriesame = (point.series.name).toUpperCase()
          let param = seriesame.split('-');
          const StackName= param[0] == null ? "" : param[0];
          const paramName= param.length > 1 ? param[1] :"";
          const paramUnits= param.length > 2 ? param[2] :"";
          outputString += "<tr><td><span style='color:" + point.color + "'>\u25CF</span></td><td> " + (StackName) + "</td><td>"+paramName+"</td><td>"+paramUnits+"</td><td> <b> " + point.y + "</b></td></tr>";
        }
      }, this);
      return outputString+='</table>';
    }
  },


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


   toggleBands(chart) {
    chart.xAxis[0].plotLinesAndBands.forEach(el => {
      if (el.svgElem !== undefined) {
                el.svgElem[ el.visible ? 'show' : 'hide' ]();
                el.visible = !el.visible;
            }
    } );
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
    this.dashboardTableRequest.isFirst =this.IsFirst;
    this._dashboardService.getDashboardQuickTableData(this.dashboardTableRequest).subscribe(
      resp => {
        if (resp.model.length === 0) {
         // this.showSnackBar('No data available ', true);
          return;
        }
        this.DashboardQuickDataResposne = resp.model as DashboardQuickDataModel[];
        this.dataSource.data = resp.model as DashboardQuickDataModel[];

          if(this.IsFirst)
          {
          this.bindChartSeries(resp.dataTable);
          this.IsFirst = false;
          } else {
           this.addSerie() ;
          this.addPoint();
        }

      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }
  bindChartSeries(chartdata: any): any {

    const listofseries =  chartdata.length > 0 ? Object.keys( chartdata[0]) : [];
    //   listofseries.forEach(item => {
      listofseries.forEach(element => {
        if (element !== 'createdDate' && element !== 'id' ) {
        const seriesfilter = this.chatsss.series
        .filter(model => model.name === element)[0];
        if (seriesfilter == null) {

          this.chatsss.addSeries({
            type: 'line',
            name: element,
            data: chartdata.map(function (point) {
             const dates = new Date(point.createdDate);
             dates.setMinutes(dates.getMinutes() + 330);
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

    const seriesplotfilter = this.chatsss.yAxis[0];
    const check = seriesplotfilter.plotLinesAndBands.filter(model => model.id == row.chartSeriesName)[0]
    if(check == null) {
    const plotOption = {
      color: '#FF0000',
      dashStyle: 'ShortDash',
      width: 2,
      zIndex: 9999,
      visible: 'hide',
      hidden : true,
      id:  row.chartSeriesName,
      value: row.threShholdValue,
      // zIndex: 0,
      label : {
          text : row.paramName + '-' + row.stackName + ' Threshhold'
      }
  };
  // this.chatsss.yAxis[0].removePlotLine(row.paramName + '-' + row.stackName + ' Threshhold');
    this.chatsss.yAxis[0].addPlotLine(plotOption);
  }

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

  hideAllSeries(): void  {

    
    this.chatsss.series.forEach(element => {
          element.hide();
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
