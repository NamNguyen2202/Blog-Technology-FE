import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pagess/sign-in/sign-in.component';
import { HomeComponent } from './pagess/home/home.component';
import { SignupComponent } from './pagess/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TestComponent } from './pagess/test/test.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SignupComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzButtonModule,
    IconsProviderModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
