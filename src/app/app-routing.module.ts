import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './pagess/sign-in/sign-in.component';
import { HomeComponent } from './pagess/home/home.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HomeComponent },

  // {
  //   path: 'home',
  //   component: AppComponent,
  //   children: [{ path: '/sign-in', component: SignInComponent }],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
