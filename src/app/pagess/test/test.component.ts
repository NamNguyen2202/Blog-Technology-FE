import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  showChangePassword = false;
  showAddArticle = false;
  showArticleMe = false;
  showArticleAll = false;
  showPerInfo = false;

  showChangePasswordComponent() {
    this.showChangePassword = true;
    this.showArticleMe = false;
    this.showArticleAll = false;
    this.showPerInfo = false;
    this.showAddArticle = false;
  }

  showAddArticlesComponent() {
    this.showAddArticle = true;
    this.showArticleMe = false;
    this.showArticleAll = false;
    this.showPerInfo = false;
    this.showChangePassword = false;
  }

  showArticleMeComponent() {
    this.showArticleMe = true;
    this.showAddArticle = false;
    this.showArticleAll = false;
    this.showPerInfo = false;
    this.showChangePassword = false;
  }
  showArticleAllComponent() {
    this.showArticleAll = true;
    this.showArticleMe = false;
    this.showAddArticle = false;
    this.showPerInfo = false;
    this.showChangePassword = false;
  }
  showPerInfoComponent() {
    this.showPerInfo = true;
    this.showArticleAll = false;
    this.showArticleMe = false;
    this.showAddArticle = false;
    this.showChangePassword = false;
  }
  isCollapsed = false;
  constructor(private router: Router) {}
  onClick() {
    this.router.navigateByUrl('sign-in'); // Replace with actual sign-in route path
  }
}
