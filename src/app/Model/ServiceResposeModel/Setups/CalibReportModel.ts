import { DateTime } from 'luxon';

export class CalibReportModel {
  calibsetupid: bigint;
  confgId: bigint;
  paramName: string;
  calibtype: string;
  calibduriation: bigint;
  create_ts: DateTime;
  updtts: DateTime;
}
