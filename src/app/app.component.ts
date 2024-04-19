import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Blog-Technology-FE';
  constructor(private router: Router) {}
  onClick() {
    this.router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
