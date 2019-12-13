import { DateTime } from 'luxon';

export class ConfgModel {
    confgId: bigint;
    siteID: string;
    busId: bigint;
    stack_name: string;
    stack_typ: string;
    slaveid: bigint;
    holdingreg: bigint;
    firstreg: bigint;
    stack_status: string;
    input_format: string;
    output_format: string;
    displayoutputtype: string;
    createts: DateTime;
    bytestoread: bigint;
    inputstringtoread: string;

}
