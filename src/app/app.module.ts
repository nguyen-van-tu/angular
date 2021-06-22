import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        // eslint-disable-next-line no-use-before-define
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),

    // Vex
    VexModule,
    CustomLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}
