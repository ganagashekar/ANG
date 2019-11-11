import { DateTime } from 'luxon';

export class SiteSetupModel {
    siteId: bigint;
    siteName: string;
    site_cpcb_cd: string;
    site_city: string;
    site_state: string;
    site_country: string;
    updt_ts: DateTime;
}
