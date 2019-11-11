import { DateTime } from 'luxon';

export class AuditModel {
    auditID: bigint;
    siteID: string;
    confgID: bigint;
    stack_name: string;
    param_name: string;
}
