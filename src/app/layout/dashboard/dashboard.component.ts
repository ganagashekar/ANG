import { Component, Optional, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DashboardQuickCounts } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickCounts';
import { DashboardService } from 'src/app/shared/services/Dashboard.Services';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { DashboardQuickDataModel } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickDataModel';
import { DashboardTableRequestModel } from 'src/app/Model/FilterModels/DashboardTableRequestModel';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { interval, Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Array<T> {
  firstOrDefault(predicate: Function): T;
}
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
  chart: Chart;
  siteId: number;
  options: Options;
  subscription: Subscription;
  DashboardQuickDataResposne: DashboardQuickDataModel[] = [];

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
    //this._dashboardService = dashboardService;
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
   // this.getDashboardQuickTableList();
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.getDashboardQuickTableList());
  }
  addPoint() {
    const x = new Date().getTime();
    const shift = this.chart.ref.series[0].data.length > 100000000;
    if (this.chart) {
      if (true) {
        //  region
        // this.chart.addPoint(Math.floor(Math.random() * 10));
        //  this.chart.ref.series[0].addPoint(20)
        //  endregion
        // element.addPoint(Math.random() * 10);
      }
      this.chart.ref.series.forEach(element => {
        if (this.DashboardQuickDataResposne != null) {
          const result = this.DashboardQuickDataResposne.filter(model => model.paramName + '-' + model.stackName === element.name)[0];

          element.addPoint([x, result.paramValue], true, shift, false);
        }
      });
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    this.DashboardQuickDataResposne.forEach(element => {
      if (element.paramName != null) {
        const result = this.chart.ref.series.filter(model => model.name === element.paramName + '-' + element.stackName)[0];
        if (result == null) {
          this.chart.addSerie({
            name: element.paramName + '-' + element.stackName,
            threshold: 1,
            data: [
            //   {
            //   'Sowing Area': "4500 H",
            //   "Plots Audited": "1200 H"
            // }
          ],
          keys: ['x', 'y', 'extraForTooltip'],
            softThreshold: true,
            id: element.configId.toString(),
            zones: [{
              value: element.threShholdValue
          },
          {
            color: '#ff0000',
            dashStyle: 'dot',
        },
      ]
          });
        }
      }
    });
  }
  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSerie(this.chart.ref.series.length - 1);
  }

  init() {
    this.options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Lve'
      },
      xAxis: {
        type: 'datetime'
      },

      credits: {
        enabled: false
      },
      series: [],
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b> {point.extraForTooltip}</td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
    },

    };
    const chart = new Chart(this.options);
    // chart.addPoint(4);
    this.chart = chart;
    // chart.addPoint(5);
    // setTimeout(() => {
    //   setTimeout(this.getDashboardQuickTableList, 5000, this._dashboardService);
    // }, 2000);

    // chart.ref$.subscribe(c => console.log(c.options.chart));
  }

  changeType = () => {
    // this.chart.options.chart = {type: 'column'};
    this.chart.ref$.pipe(first()).subscribe(chart => {
      // chart.update({ chart: { type: 'column' } });
      this.updateChart({ chart: { type: 'column' } });
    });
  }
  private updateChart = (options: Options) => {
    // By default if the value of the object property is undefined lodash won't use this but keeps
    // the original after using _.merge(). We can customize the merge with _.mergeWith().
    // If we return undefined inside the customizer function lodash handles the merge like above not keeping the undefined value.
    // With deleting the property we trick lodash and with this the property gets undefined value after the merge.
    const customizer = (_objValue: Optional, srcValue: Optional, key: any, object: any) => {
      if (srcValue === undefined) {
        delete object[key];
      }
    };

    console.log(options.chart, options.plotOptions);
    const mergedOptions = _.mergeWith(this.options, options, customizer);
    console.log(mergedOptions.chart, mergedOptions.plotOptions);

    this.chart = new Chart(mergedOptions);
  };

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
    this.chart.ref.series.forEach(element => {
      if (row != null) {
        if  (row.paramName + '-' + row.stackName !== element.options.name) {
          element.hide();
        }
      }
    });
  }

  SelectedGroupDrawCharts(row: DashboardQuickDataModel) {
    this.showAllSeries();
    this.chart.ref.series.forEach(element => {
      if (row != null) {
        if  (row.configId.toString() !== element.options.id) {
          element.hide();
        }
      }
    });
  }

  showAllSeries(): void  {
    this.chart.ref.series.forEach(element => {
          element.show();
    });
  }
}
