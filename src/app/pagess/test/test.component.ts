import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  isCollapsed = false;
  constructor(private router: Router) {}
  onClick() {
    this.router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
