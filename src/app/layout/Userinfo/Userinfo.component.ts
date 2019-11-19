import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { UserinfoFilter } from 'src/app/Model/FilterModels/UserinfoFilter';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { UserModel } from 'src/app/Model/ServiceResposeModel/Setups/UserModel';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { UserinfoService } from 'src/app/shared/services/Userinfo.service';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { UserinfoEditTemplateComponent } from '../gridEditorTemplates/userinfoEditTemplate/userinfoEditTemplate.component';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  UserinfoFilter: UserinfoFilter;
  UserinfoListDataSource: MatTableDataSource<UserModel>;
  displayedColumns: string[] = [
     'editAction', 'UserId', 'UserPass', 'isEnabled', 'UserName', 'vendorSiteId', 'creatts', 'updtts', 'deleteAction',
   ];
   constructor(private _dialog: MatDialog, private _appcomponent: AppComponent, private _route: ActivatedRoute,
    private _userinfoservices: UserinfoService,
    private snackBar: MatSnackBar) {
      _appcomponent.currenturl = '/Userinfosetup';
      this.UserinfoListDataSource = new MatTableDataSource<UserModel>();
      this.UserinfoFilter = new UserinfoFilter();
  }

  ngOnInit() {
    this.getAllUserinfoList();
  }

  getAllUserinfoList(): void {
    this.UserinfoFilter.UserId = this._appcomponent.UserId;
    this._userinfoservices.getAllUserinfoList(this.UserinfoFilter).subscribe(resp => {
     this.UserinfoListDataSource.data = resp.model as UserModel[];
   }, error => {
     console.log('Error: ' + error);
   });

 }

 NewUserinfo(): void {
  const dialogRef = this._dialog.open(UserinfoEditTemplateComponent, {
    width: '500px',
    data: { action: 'add', UserModel }
  });
  dialogRef.componentInstance.UserinfoEditorEmitter.subscribe((response: any) => {
     if (response.model > 0) {
      this.getAllUserinfoList();
      this.showSnackBar('userinfo details added Successfully.');
      } else {
    this.showSnackBar(response.message, true);
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
edituserinfo(Scheduler: UserModel): void {
  const dialogRef = this._dialog.open(UserinfoEditTemplateComponent, {
    width: '500px',
    data: { action: 'edit', Scheduler }
  });
  dialogRef.componentInstance.UserinfoEditorEmitter.subscribe((response: any) => {
  if (response.model > 0) {
    this. getAllUserinfoList();
    this.showSnackBar('Userinfo Updated Successfully.');
   } else {
this.showSnackBar('Error occurred while updating the Userdetails.', true);
   }
  });
}
deleteuserinfo(userId: number): void {
  const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
    width: '420px',
    data: { Title: 'Confirm', Message: 'Are you sure want to delete this userinfo ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._userinfoservices.deleteuserinfo(userId).subscribe((response: any) => {
        if (response.model) {
        this. getAllUserinfoList();
          this.showSnackBar('Scheduled User Deleted Successfully.');
       } else {
        this.showSnackBar('Error occurred while deleting the User.', true);
        }
        this.showSnackBar(response.message);
      }, error => {
        console.log('Error: ' + error);
      });
    }
  });
}
}

