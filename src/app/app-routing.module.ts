import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { AddArticleDialogComponent } from './components/add-post/add-post.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'post/insertpost', component: AddArticleDialogComponent },
  // { path: '**', redirectTo: '' },
  // { path: 'change-pass', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
