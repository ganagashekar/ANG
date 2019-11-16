import { DateTime } from 'luxon';


export interface Loginresponse {
  message: string;
  didError: boolean;
  errorMessage?: null;
  model: Model;
}
export interface Model {
  userId: number;
  userName: string;
  userPass?: null;
  isEnabled: string;
  site: Site;
  validityts: string;
  creatts: string;
  updtts: string;
  siteId: number;
}
export interface Site {
  siteId: number;
  siteName: string;
  site_cpcb_cd?: null;
  site_city: string;
  site_state: string;
  site_country: string;
  updt_ts: string;
}


// export class Loginresponse {
//     Message: string ;
//     DidError: boolean;
//     ErrorMessage: string;
//     model: UserModel;
// }


// export class UserModel  {
//     userId: number;
//     userName: string ;
//     isEnabled: boolean;
//     vendorsiteId: string;
//     validityts: DateTime;
//     creatts: DateTime;
//     updtts: DateTime;
// }

