export class ReportRequestModel {
  StackId: number;
  SiteId: number;
  ParamId: number;
  FromDate: Date;
  ToDate: Date;
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
