import { DateTime } from 'luxon';

export class CalibReportModel {
  confgId: bigint;
  paramName: string;
  calibtype: string;
  calibduriation: bigint;
  create_ts: DateTime;
  updtts: DateTime;
}
