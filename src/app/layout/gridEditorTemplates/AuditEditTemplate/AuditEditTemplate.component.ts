import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuditService } from 'src/app/shared/services/Audit.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { AuditModel } from 'src/app/Model/ServiceResposeModel/CommonModel/AuditModel';
import { AuditFilter } from 'src/app/Model/FilterModels/AuditFilter';

@Component({
  selector: 'app-AuditEditTemplate',
  templateUrl: './AuditEditTemplate.component.html',
  styleUrls: ['./AuditEditTemplate.component.scss']
})
export class AuditEditTemplateComponent implements OnInit {
  @Output()
  auditEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  SelectedauditID: bigint;
  SelectedsiteID: string;
  SelectedconfgID: bigint;
  editModel: AuditModel;
  auditFilter: AuditFilter;
  constructor(public dialogRef: MatDialogRef<AuditEditTemplateComponent>, private _Auditservices: AuditService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.auditFilter = new AuditFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.scheduler as AuditModel );
        this.SelectedauditID = this.editModel.auditID;
        this.SelectedsiteID = this.editModel.siteID;
        this.SelectedconfgID = this.editModel.confgID;
      }
    }

  ngOnInit() {
    this.schedulerForm = this.formBuilder.group({
      auditID: new FormControl('', [Validators.required]),
      siteID: new FormControl('', [Validators.required]),
      confgID: new FormControl('', [Validators.required]),
      stack_name: new FormControl('', [Validators.required]),
      param_name: new FormControl('', [Validators.required]),
    });
  }
}
