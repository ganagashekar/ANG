import { DateTime } from 'luxon';

export class CalibReportModel {
  calibsetupid: bigint;
  confgId: bigint;
  paramname: string;
  clib_name: string;
  calibtype: string;
  calib_start_date: DateTime;
  calib_end_date: DateTime;
  calib_zero_gas_name: string;
  calib_zero_gas_unit: string;
  calib_zero_gas_type: string;
  ca_set_new_zero_value: bigint;
  calib_zero_duriation: bigint;
  calib_zero_delay: bigint;
  calib_span_gas_name: string;
  calib_span_gas_unit: string;
  calib_span_gas_type: string;
  calib_span_delay: bigint;
  calib_span_duriation: bigint;
  ca_set_new_span_value: bigint;
  create_ts: DateTime;
  updtts: DateTime;
  paramId: bigint;

  siteId: bigint;
  siteName: string;
}
