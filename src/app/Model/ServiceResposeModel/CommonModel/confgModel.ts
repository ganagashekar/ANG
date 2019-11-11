import { DateTime } from 'luxon';

export class ConfgModel {
    confgID: bigint;
    siteID: string;
    busID: bigint;
    vendorID: string;
    stack_name: string;
    stack_typ: string;
    stack_status: string;
    createts: DateTime;

}
