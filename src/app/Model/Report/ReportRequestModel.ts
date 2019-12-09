

export class ReportRequestModel {
  StackId: number;
  SiteId: number;
  ParamId: number;
  FromDate: string;
  ToDate: string;

  FromDateVM: Date;
  ToDateVM: Date;

  FromTimeVM: string;
  ToTimeVM: string;

  TimePeriod: number;
  IsExport: boolean;
  StartIndex: number;
  EndIndex: number;
  ReportType: string;
  SiteName: string;
  SiteCode: string;
  RequestedUser: string;
  ReportTitle: string;

}
