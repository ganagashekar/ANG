import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { AuditFilter } from 'src/app/Model/FilterModels/AuditFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { AuditModel } from 'src/app/Model/ServiceResposeModel/CommonModel/AuditModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from 'src/app/shared/services/Audit.service';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {
  AuditFilter: AuditFilter;
  stacksArray: ReferenceRecords[] = [];
  AuditListDataSource: MatTableDataSource<AuditModel>;
  displayedColumns: string[] = [
    'auditID', 'siteID', 'confgID',
    'stack_name', 'param_name', 'deleteAction'
   ];

   @ViewChild(MatSort, { static: false }) sort: MatSort;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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

  ngAfterViewInit(): void {
    this.AuditListDataSource.sort = this.sort;
    this.AuditListDataSource.paginator = this.paginator;
  }

  getAllAuditList(): void {
    this.AuditFilter.AuditId = this._appcomponent.AuditId;
    this._Auditservices.getAllAuditList(this.AuditFilter).subscribe(resp => {
     this.AuditListDataSource.data = resp.model as AuditModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  deleteaudit(auditID: bigint, ): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: { Title: 'Confirm', Message: 'Are you sure want to delete this Audit ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._Auditservices.deleteaudit(auditID).subscribe((response: any) => {
          if (response.model) {
             this. getAllAuditList();
             this.showSnackBar('Scheduled Parameter Deleted Successfully.');
         } else {
           this.showSnackBar('Error occurred while deleting the Parameter.', true);
          }
          this.showSnackBar(response.message);
        }, error => {
          console.log('Error: ' + error);
        });
      }
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
