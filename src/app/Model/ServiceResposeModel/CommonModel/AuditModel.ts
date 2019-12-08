import { DateTime } from 'luxon';

export class AuditModel {
    auditID: bigint;
    siteID: bigint;
    confgID: bigint;
    stack_name: string;
    param_name: string;
}
