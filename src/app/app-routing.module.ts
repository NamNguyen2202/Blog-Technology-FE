import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { homeClientComponent } from './pages/homeClient/homeClient.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'homeClient', component: homeClientComponent },
  { path: 'change-pass', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
