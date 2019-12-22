import { DateTime } from 'luxon';

export class CameraModel {
  camId: bigint;
  confgId: bigint;
  paramId: number;
  siteName: string;
  siteId: bigint;
  stackId: number;
  stackName: string;
  paramName: string;
  rtpsUrl: string;
  ipAddress: string;
  camMake: string;
  cam_model_no: string;
  ptz: string;
  connectivity_typ: string;
  band_width: string;
  night_vision: string;
  zoom: string;
  creat_usr: string;
  creat_ts: DateTime;
  updt_ts: DateTime;
}
