import { DateTime } from 'luxon';

export class ControllerBusModel {
    busId: bigint;
    macId: string;
    comPort: string;
    protocal: string;
    baudrate: bigint;
    timeOut: bigint;
    startIndex: bigint;
    updtts: DateTime;
    // length: number;
    // creatts: DateTime;
    // updtts: DateTime;
}
