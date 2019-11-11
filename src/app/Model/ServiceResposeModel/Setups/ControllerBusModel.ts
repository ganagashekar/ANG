import { DateTime } from 'luxon';

export class ControllerBusModel {
    busId: bigint;
    macId: string;
    comPort: string;
    baudRate: bigint;
    timeOut: bigint;
    startIndex: bigint;
    protocal: string;
    updtts: DateTime;
    // length: number;
    // creatts: DateTime;
    // updtts: DateTime;
}
