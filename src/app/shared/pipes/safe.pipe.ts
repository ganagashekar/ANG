import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  constructor(private sanitizer: DomSanitizer) { }
transform(url) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


