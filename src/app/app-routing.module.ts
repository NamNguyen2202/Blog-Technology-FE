import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './pagess/sign-in/sign-in.component';
import { HomeComponent } from './pagess/home/home.component';
import { SignupComponent } from './pagess/sign-up/sign-up.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },

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
