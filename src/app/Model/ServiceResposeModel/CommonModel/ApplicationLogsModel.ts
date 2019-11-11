import { DateTime } from 'luxon';

export class ApplicationLogsModel {
    logID: bigint;
    confgID: bigint;
    errorCode: string;
    createts: DateTime;
}
