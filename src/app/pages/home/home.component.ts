import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private Router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserName(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.userName;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.Router.navigateByUrl('/sign-in');
  }
  ngOnInit(): void {
    this.loadData(1);
    if (!this.isLoggedIn()) {
      this.Router.navigateByUrl('/sign-in');
    }
  }
  data: ItemData[] = [];

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => ({
      href: 'http://ant.design',
      title: `ant design part ${index} (page: ${pi})`,
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));
  }

  isCollapsed = false;

  onSignUp() {
    this.Router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.Router.navigateByUrl('sign-in');
  }
}
