import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Sign-in/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
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
