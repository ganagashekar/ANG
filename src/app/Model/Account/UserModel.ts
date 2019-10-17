import { DateTime } from 'luxon';


export class Loginresponse {
    Message: string ;
    DidError: boolean;
    ErrorMessage: string;
    model: UserModel;
}


export class UserModel  {
    userId: number;
    userName: string ;
    isEnabled: boolean;
    vendorsiteId: string;
    validityts: DateTime;
    creatts: DateTime;
    updtts: DateTime;
}
