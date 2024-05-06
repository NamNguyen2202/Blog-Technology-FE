import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzListModule } from 'ng-zorro-antd/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { TestComponent } from './pages/test/test.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddArticlesComponent } from './components/add-articles/add-articles.component';
import { ArticleMeComponent } from './components/article-me/article-me.component';
import { ArticleAllComponent } from './components/article-all/article-all.component';
import { PerInfoComponent } from './components/per-info/per-info.component';
import { MatIconModule } from '@angular/material/icon';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SignupComponent,
    TestComponent,
    ChangePasswordComponent,
    AddArticlesComponent,
    ArticleMeComponent,
    ArticleAllComponent,
    PerInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzButtonModule,
    HttpClientModule,
    IconsProviderModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: vi_VN },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
