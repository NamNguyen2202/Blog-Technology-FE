import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { SignupComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private Router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  isCollapsed = false;

  onSignUp() {
    this.Router.navigateByUrl('sign-up'); // Replace with actual sign-in route path
    // this.signUpComponent.show();
  }
  onSignIn() {
    this.Router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
