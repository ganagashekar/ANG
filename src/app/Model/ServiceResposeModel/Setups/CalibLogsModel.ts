import { DateTime } from 'luxon';

export class CalibrationlogModel {
  calibsetupid: bigint;
  confgId: bigint;
  paramname: string;
  clib_name: string;
  calibtype: string;
  calib_start_date: DateTime;
  calib_end_date: DateTime;
  siteId: bigint;
  siteName: string;
    // length: number;
    // creatts: DateTime;
    // updtts: DateTime;
}
