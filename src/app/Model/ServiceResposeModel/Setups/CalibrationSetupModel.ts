import { DateTime } from 'luxon';

export class CalibrationModel {
  calib_cmd_id: bigint;
  confg_id: bigint;
    stack_name: string;
    param_name: string;
    setZeroCmd: string;
    setZeroResp: string;
    zeroRelayOpenCmd: string;
    zeroRelayOpenResp: string;
    zeroRelayCloseCmd: string;
    zeroRelayCloseResp: string;
    readPrevValueCmd: string;
    readPrevValueRes: string;
    realGasRelayOpenCmd: string;
    realGasRelayOpenResp: string;
    realGasRelayCloseCmd: string;
    real_GasRelayCloseResp: string;
    setNewValueCmd: string;
    setNewValueResp: string;
    setMakeSpanCmd: string;
    setMakeSpanResp: string;
    updtUsr: string;
    updtts: DateTime;
    // length: number;
    // creatts: DateTime;
    // updtts: DateTime;
}
