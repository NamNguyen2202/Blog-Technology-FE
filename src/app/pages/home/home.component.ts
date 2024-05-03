import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  // isCollapsed = false;
  onSignUp() {
    this.router.navigateByUrl('sign-up');
  }
  onSignIn() {
    this.router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
