import { ChartModule } from 'angular-highcharts';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
// import { LoaderService } from './shared/services/loader.service';
// import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
// AoT requires an exported function for factories
import { HighchartsChartModule } from 'highcharts-angular';



export function highchartsModules() {
    // apply Highcharts Modules to this array
    return [stock, more];
  }
// import { LoaderComponent } from './shared/loader/loader.component';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE } from '@angular/material';
import { LoadingBarHttpClientModule } from './packages/http-client';
import { LoadingBarRouterModule } from './packages/router';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        MaterialModule,
        ChartModule,
        ReactiveFormsModule,
        FormsModule,
        HighchartsChartModule,
        BrowserModule,
        AppRoutingModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        MaterialModule,

        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
    bootstrap: [AppComponent]
})
export class AppModule {}
