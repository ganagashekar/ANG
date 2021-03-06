
import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserinfoService } from '../../../shared/services/Userinfo.service';
import { ReferenceRecords } from '../../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { UserModel } from '../../../Model/ServiceResposeModel/Setups/userModel';
import { UserinfoFilter } from '../../../Model/FilterModels/UserinfoFilter';

@Component({
  selector: 'app-userinfoedittemplate',
  templateUrl: './userinfoEditTemplate.component.html',
  styleUrls: ['./userinfoEditTemplate.component.scss']
})
export class UserinfoEditTemplateComponent implements OnInit {
  @Output()
  UserinfoEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  userroleArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 SelecteduserId: bigint ;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
  SelectedvendorsiteId: bigint;
  editModel: UserModel;
  UserinfoFilter: UserinfoFilter;
  constructor(public dialogRef: MatDialogRef<UserinfoEditTemplateComponent>, private _Userinfoservices: UserinfoService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.UserinfoFilter = new UserinfoFilter();
    if (data !== undefined && data.action === 'edit') {
      this.isAdd = false;
      this.editModel = (data.Scheduler as UserModel );
     this.SelecteduserId = this.editModel.userId;
     // this.SelecteduserName = this.editModel.userName;
     this.SelectedvendorsiteId = this.editModel.vendorSiteId;
     // this.SelectedvendorisEnabled = this.editModel.isEnabled;
    }


  }
  ngOnInit() {
    // this.getAllParameterList(0);
    this.getuserRole();
    // this.getAllParameterUnitsList(0);
    this.schedulerForm = this.formBuilder.group({
      userId: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required]),
      isEnabled: new FormControl('', [Validators.required]),
     // roleName: new FormControl('', [Validators.required]),
     // roleId: new FormControl('', [Validators.required]),
      vendorSiteId:  new FormControl('', [Validators.required]),
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          userId: this.editModel.userId,
          userName: this.editModel.userName,
          userPass: this.editModel.userPass,
          isEnabled: this.editModel.isEnabled,
          vendorSiteId: this.editModel.vendorSiteId,
         // roleName: this.editModel.roleName,
          //roleId: this.editModel.roleId,

        });


      }
  }
  getuserRole(): void {
   // this.UserinfoFilter.roleId = 1;
  // this.siteSetupFilter.StackId = siteId;

  this._Userinfoservices.getuserRole(0, false).subscribe(resp => {
    this.userroleArray = resp.model as ReferenceRecords[];
 }, error => {
   console.log('Error: ' + error);
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

  onFormSubmit(): void {
    if (this.schedulerForm.valid) {
      this.schedulerForm.disable();
      this.saveScheduler();

    }
  }

  saveScheduler(): void {
    const schedulerDetails = this.schedulerForm.value;
   if (!this.isAdd) {
     schedulerDetails.userId = this.SelecteduserId;
   }
   this._Userinfoservices.saveUserinfo(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.UserinfoEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
