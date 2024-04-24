import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pagess/sign-in/sign-in.component';
import { SignupComponent } from './pagess/sign-up/sign-up.component';
import { HomeComponent } from './pagess/home/home.component';
import { TestComponent } from './pagess/test/test.component';
import { ChangePasswordComponent } from './componentss/change-password/change-password.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'change-pass', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
