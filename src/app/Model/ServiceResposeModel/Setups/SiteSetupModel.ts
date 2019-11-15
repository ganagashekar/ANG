import { DateTime } from 'luxon';

export class SiteSetupModel {
  siteId: bigint;
  siteName: string;
  site_cpcb_cd: string;
  site_city: string;
  site_state: string;
  site_country: string;
  updt_ts: DateTime;
   siteLogo: string;
   industryType: string;
  sitePrimaryContactName: string;
   sitePrimaryContactPhone: string;
  sitePrimaryContactEmail: string;
   siteSecondaryContactName: string;
  siteSecondaryContactPhone: string;
siteSecondaryContactEmail: string;
   siteLatitude: string;
   siteLongitude: string;
   siteAddress1: string;
   siteAddress2: string;
   sitePinCode: string;
   site_District: string;
}
