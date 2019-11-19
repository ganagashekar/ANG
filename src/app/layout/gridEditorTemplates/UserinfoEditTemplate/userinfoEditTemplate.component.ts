
import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserinfoService } from 'src/app/shared/services/Userinfo.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { UserModel } from 'src/app/Model/ServiceResposeModel/Setups/userModel';
import { UserinfoFilter } from 'src/app/Model/FilterModels/UserinfoFilter';

@Component({
  selector: 'app-userinfoedittemplate',
  templateUrl: './userinfoEditTemplate.component.html',
  styleUrls: ['./userinfoEditTemplate.component.scss']
})
export class UserinfoEditTemplateComponent implements OnInit {
  @Output()
  UserinfoEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
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
    // this.getAllParameterUnitsList(0);
    this.schedulerForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required]),
      isEnabled: new FormControl('', [Validators.required]),
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          userName: this.editModel.userName,
          userPass: this.editModel.userPass,
          isEnabled: this.editModel.isEnabled,

        });


      }
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
