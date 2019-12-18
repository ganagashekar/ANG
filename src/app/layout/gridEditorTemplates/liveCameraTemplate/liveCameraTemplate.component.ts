import { Component, OnInit, Inject, Pipe, PipeTransform , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraModel } from 'src/app/Model/ServiceResposeModel/Setups/CameraModel';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CameraService } from 'src/app/shared/services/Camera.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CameraFilter } from 'src/app/Model/FilterModels/CameraFilter';
@Component({
  selector: 'app-liveCameraTemplate',
  templateUrl: './liveCameraTemplate.component.html',
  styleUrls: ['./liveCameraTemplate.component.scss']
})


export class LiveCameraTemplateComponent implements OnInit {
  cameraFilter: CameraFilter;
 // cameraUrl: SafeResourceUrl;
  CameraListDataSource: MatTableDataSource<CameraModel>;
  displayedColumns: string[] = [
     'ipAddress', 'camMake', 'cam_model_no', 'connectivity_typ', 'band_width', 'night_vision', 'zoom' ,'rtpsUrl'
   ];

//   @Output()
//   CameraEditorEmitter = new EventEmitter<any>();
 cameraUrl: SafeResourceUrl;
  rtpsUrl: string;

  constructor(private _dialog: MatDialog, private _route: ActivatedRoute,  private router: Router,
    private _cameraservices: CameraService, public sanitizer: DomSanitizer,
    private snackBar: MatSnackBar) {
   // 'http://g2.ipcamlive.com/player/player.php?alias=5df312e656e65'
  //  const refereceUrl = 'http://g2.ipcamlive.com/player/player.php?alias=5df312e656e65';
  // const refereceUrl = this.rtpsUrl;
  //   this.cameraUrl = sanitizer.bypassSecurityTrustResourceUrl(refereceUrl);
   const refereceUrl = this.rtpsUrl;
   this.cameraUrl = sanitizer.bypassSecurityTrustResourceUrl(refereceUrl);
  this.CameraListDataSource = new MatTableDataSource<CameraModel>();
  this.cameraFilter = new CameraFilter();

  }


  ngOnInit() {
    this.getAllCameraList();
  }
  getAllCameraList(): void {

    this._cameraservices.getAllCameraList(this.cameraFilter).subscribe(resp => {
     this.CameraListDataSource.data = resp.model as CameraModel[];
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
}
