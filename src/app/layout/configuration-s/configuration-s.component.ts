import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfgModel } from 'src/app/Model/ServiceResposeModel/CommonModel/confgModel';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ConfgService } from 'src/app/shared/services/Confg.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ConfgFilter } from 'src/app/Model/FilterModels/ConfgFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ConfigurationEditTemplateComponent } from '../gridEditorTemplates/configurationEditTemplate/configurationEditTemplate.component';

@Component({
  selector: 'app-configuration-s',
  templateUrl: './configuration-s.component.html',
  styleUrls: ['./configuration-s.component.scss']
})
export class ConfigurationSComponent implements OnInit {

  confgFilter: ConfgFilter;
  stacksArray: ReferenceRecords[] = [];
  confgListDataSource: MatTableDataSource<ConfgModel>;
  displayedColumns: string[] = [
    'editAction', 'confgID', 'siteID', 'busID',
    'stack_name', 'stack_typ', 'stack_status',
    'createts', 'input_format', 'output_format', 'disp_output_typ', 'deleteAction'
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
    const dialogRef = this._dialog.open( ConfigurationEditTemplateComponent, {
      width: '500px',
      data: { action: 'add',  ConfgModel }
    });
    dialogRef.componentInstance. ConfigEditorEmitter.subscribe((response: any) => {
       if (response.model > 0) {
         this.getAllconfgList();
        this.showSnackBar('Config added Successfully.');
          } else {
      this.showSnackBar(response.message, true);
       }
    });
   }

   editconfig(Scheduler: ConfgModel): void {
    const dialogRef = this._dialog.open(ConfigurationEditTemplateComponent, {
      width: '500px',
      data: { action: 'edit', Scheduler }
    });
    dialogRef.componentInstance.ConfigEditorEmitter.subscribe((response: any) => {
    if (response.model > 0) {
       this. getAllconfgList();
      this.showSnackBar('Config Updated Successfully.');
     } else {
   this.showSnackBar('Error occurred while updating the Config.', true);
     }
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
          if (response.model) {
             this. getAllconfgList();
             this.showSnackBar('Scheduler Config Deleted Successfully.');
         } else {
          this.showSnackBar('Error occurred while deleting the Config.', true);
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
