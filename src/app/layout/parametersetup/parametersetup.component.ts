import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ParameterFilter } from 'src/app/Model/FilterModels/ParameterFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ParamModel } from 'src/app/Model/ServiceResposeModel/Setups/ParamModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { SetupsService } from 'src/app/shared/services/Setups.service';

@Component({
  selector: 'app-parametersetup',
  templateUrl: './parametersetup.component.html',
  styleUrls: ['./parametersetup.component.scss']
})
export class ParametersetupComponent implements OnInit , AfterViewInit {
  parameterFilter: ParameterFilter;
  stacksArray: ReferenceRecords[] = [];
  paramListDataSource: MatTableDataSource<ParamModel>;
  displayedColumns: string[] = [
    'editAction', 'StackName', 'paramname', 'paramunit',
    'paramminval', 'parammaxval', 'threshholdval',
    'paramposition', 'creatts', 'updtts',
   'deleteAction'];

   receivedChildMessage: string;

   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _setupsservices: SetupsService,
    private snackBar: MatSnackBar) {
    _appcomponent.currenturl = '/Paramsetup';
    this.paramListDataSource = new MatTableDataSource<ParamModel>();
    this.parameterFilter = new ParameterFilter();
  }

  ngOnInit() {

    this. getAllStacks();
    this.getAllParameterList();
    this.parameterFilter.StackId = 0;
    this.parameterFilter.SiteId = this._appcomponent.SiteId;
  }

  ngAfterViewInit(): void {
    this.paramListDataSource.sort = this.sort;
    this.paramListDataSource.paginator = this.paginator;
  }

  StackChange() {
    this.getAllParameterList();
  }

  getAllParameterList(): void {

    this.parameterFilter.SiteId = this._appcomponent.SiteId;
    this._setupsservices.getAllParameterList(this.parameterFilter).subscribe(resp => {
     this.paramListDataSource.data = resp.model as ParamModel[];
   }, error => {
     console.log('Error: ' + error);
   });
 }
getAllStacks(): void {
  this._setupsservices.getAllStacks(0, true).subscribe(resp => {
    this.stacksArray = resp.model as ReferenceRecords[];
  }, error => {
    console.log('Error: ' + error);
  });
}


}
