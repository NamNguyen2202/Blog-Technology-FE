import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TestComponent } from './pages/test/test.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
    { path: 'change-pass', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
