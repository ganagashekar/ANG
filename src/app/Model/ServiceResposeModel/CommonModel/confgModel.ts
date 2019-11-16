import { DateTime } from 'luxon';

export class ConfgModel {
    confgID: bigint;
    siteID: string;
    busID: bigint;
    vendorID: string;
    stack_name: string;
    stack_typ: string;
    stack_status: string;
    input_format: string;
    output_format: string;
    slaveid: bigint;
    holdingreg: bigint;
    firstreg: bigint;
    createts: DateTime;

}
