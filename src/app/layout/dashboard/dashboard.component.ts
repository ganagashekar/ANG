import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DashboardQuickCounts } from 'src/app/Model/ServiceResposeModel/Dashboard/DashboardQuickCounts';
import { DashboardService } from 'src/app/shared/services/Dashboard.Services';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , AfterViewInit {
  dashboardQuickCounts: DashboardQuickCounts;
  stackCount: number;
  paramCount: number;
  exceedenceCount: number;
  alertCount: number;
  parameterFilter: ParameterFilter;
   constructor(private _dialog: MatDialog, private _appcomponent: AppComponent,
    private _route: ActivatedRoute,
    private _dashboardService: DashboardService,
    private snackBar: MatSnackBar) {
    _appcomponent.currenturl = '/dashboard';
    // this.paramListDataSource = new MatTableDataSource<ParamModel>();
    this.parameterFilter = new ParameterFilter();
  }


    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];


    @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    // constructor() {

    //   this.dashboardQuickCounts = new DashboardQuickCounts();

    //     this.places = [
    //         {
    //             imgSrc: 'assets/images/card-1.jpg',
    //             place: 'Cozy 5 Stars Apartment',
    //             description:
    //                 // tslint:disable-next-line:max-line-length
    //                 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
    //             charge: '$899/night',
    //             location: 'Barcelona, Spain'
    //         },
    //         {
    //             imgSrc: 'assets/images/card-2.jpg',
    //             place: 'Office Studio',
    //             description:
    //                 // tslint:disable-next-line:max-line-length
    //                 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
    //             charge: '$1,119/night',
    //             location: 'London, UK'
    //         },
    //         {
    //             imgSrc: 'assets/images/card-3.jpg',
    //             place: 'Beautiful Castle',
    //             description:
    //                 // tslint:disable-next-line:max-line-length
    //                 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
    //             charge: '$459/night',
    //             location: 'Milan, Italy'
    //         }
    //     ];
    // }

    ngOnInit() {
      this.getDashboardQuickCounts();
    }

    ngAfterViewInit(): void {

    }

    getDashboardQuickCounts(): void {

      this.parameterFilter.SiteId = this._appcomponent.SiteId;
      this._dashboardService.getDashboardQuickCounts(this.parameterFilter).subscribe(resp => {
       this.dashboardQuickCounts = resp.model as DashboardQuickCounts;
       this.stackCount = this.dashboardQuickCounts.stackCount;
       this.paramCount = this.dashboardQuickCounts.paramCount;
       this.exceedenceCount = this.dashboardQuickCounts.exceedenceCount;
       this.alertCount = this.dashboardQuickCounts.alertCount;
     }, error => {
       console.log('Error: ' + error);
     });
   }
}
