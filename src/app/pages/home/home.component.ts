import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}
  isCollapsed = false;
  onSignUp() {
    this.router.navigateByUrl('sign-up'); // Replace with actual sign-in route path
  }
  onSignIn() {
    this.router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
