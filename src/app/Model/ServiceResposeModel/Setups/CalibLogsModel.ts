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
    calib_zero_gas_unit: string;
    ca_set_new_zero_value: bigint;
    calib_span_delay: bigint;
    calib_span_duriation: bigint;
    calib_zero_delay: bigint;
}
