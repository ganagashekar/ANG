import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ConfgFilter } from 'src/app/Model/FilterModels/ConfgFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ConfgModel } from 'src/app/Model/ServiceResposeModel/CommonModel/confgModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ConfgService } from 'src/app/shared/services/Confg.service';
import { ConfigEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/ConfigEditTemplate/ConfigEditTemplate.Component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-confg',
  templateUrl: './confg.component.html',
  styleUrls: ['./confg.component.scss']
})
export class ConfgComponent implements OnInit {
  confgFilter: ConfgFilter;
  stacksArray: ReferenceRecords[] = [];
  confgListDataSource: MatTableDataSource<ConfgModel>;
  displayedColumns: string[] = [
    'editAction', 'confgID', 'siteID', 'busID', 'vendorID',
    'stack_name', 'stack_typ', 'stack_status',
    'createts', 'input_format', 'cnfg_input_str', 'output_format', 'disp_output_typ', 'deleteAction'
   ];
  constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _confgsservices: ConfgService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Confg';
      this.confgListDataSource = new MatTableDataSource<ConfgModel>();
      this.confgFilter = new ConfgFilter();
     }

  ngOnInit() {
    this.getAllconfgList();
  }

  getAllconfgList(): void {
    this.confgFilter.ConfgId = this._appcomponent.confgID;
    this._confgsservices.getAllconfgList(this.confgFilter).subscribe(resp => {
     this.confgListDataSource.data = resp.model as ConfgModel[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  Newconfig(): void {
    const dialogRef = this._dialog.open( ConfigEditTemplateComponent, {
      width: '500px',
      data: { action: 'add',  ConfgModel }
    });
    dialogRef.componentInstance. ConfigEditorEmitter.subscribe((response: any) => {
      // if (response.model > 0) {
        // this.getAllParameterList();
        this.showSnackBar('Config added Successfully.');    // } else {
      //  this.showSnackBar(response.message, true);
      // };
    });
   }

   editconfig(Scheduler: ConfgModel): void {
    const dialogRef = this._dialog.open(ConfigEditTemplateComponent, {
      width: '500px',
      data: { action: 'edit', Scheduler }
    });
    dialogRef.componentInstance.ConfigEditorEmitter.subscribe((response: any) => {
   // if (response.model > 0) {
      // this. getAllErrorCodeList();
      this.showSnackBar('Config Updated Successfully.');
    // } else {
  // this.showSnackBar('Error occurred while updating the Parameter.', true);
    // }
    });
  }
  Deleteconfig(confgID: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: { Title: 'Confirm', Message: 'Are you sure want to delete this Config ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._confgsservices.Deleteconfig(confgID).subscribe((response: any) => {
         // if (response.model) {
            // this. getAllParameterList();
            // this.showSnackBar('Scheduled Parameter Deleted Successfully.');
         // } else {
          // this.showSnackBar('Error occurred while deleting the Parameter.', true);
         // }
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