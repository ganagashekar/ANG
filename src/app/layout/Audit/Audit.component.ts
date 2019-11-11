import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { AuditFilter } from 'src/app/Model/FilterModels/AuditFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { AuditModel } from 'src/app/Model/ServiceResposeModel/CommonModel/AuditModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from 'src/app/shared/services/Audit.service';

@Component({
  selector: 'app-Audit',
  templateUrl: './Audit.component.html',
  styleUrls: ['./Audit.component.scss']
})
export class AuditComponent implements OnInit {
  AuditFilter: AuditFilter;
  stacksArray: ReferenceRecords[] = [];
  AuditListDataSource: MatTableDataSource<AuditModel>;
  displayedColumns: string[] = [
    'auditID', 'siteID', 'confgID',
    'stack_name', 'param_name',
   ];
    constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _Auditservices: AuditService,
     private snackBar: MatSnackBar) {
    _appcomponent.currenturl = '/audit';
    this.AuditListDataSource = new MatTableDataSource<AuditModel>();
    this.AuditFilter = new AuditFilter();
     }

  ngOnInit() {
    this.getAllAuditList();
  }
  getAllAuditList(): void {
    this.AuditFilter.AuditId = this._appcomponent.AuditId;
    this._Auditservices.getAllAuditList(this.AuditFilter).subscribe(resp => {
     this.AuditListDataSource.data = resp.model as AuditModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }
}
