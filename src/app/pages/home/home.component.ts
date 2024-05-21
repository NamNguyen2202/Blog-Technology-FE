import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ICategory, IPost } from './interfaces/home.interface';
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
  categories: ICategory[] = [];
  post: IPost[] = [];
  // allSelected: boolean = false;h

  isCollapsed = false;
  constructor(private Router: Router, private homeService: HomeService) {}
  ngOnInit(): void {
    // this.loadData(1);
    this.getCategories();
  }
  getCategories() {
    this.homeService.GetCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Danh sách danh mục:', categories);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }
  // data: ItemData[] = [];

  getPost(): void {
    this.homeService.GetPost().subscribe({
      next: (post) => {
        this.post = post;
        console.log('Danh sách bài viết:', post);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  // toggleAllSelection() {
  //   this.allSelected = !this.allSelected;
  //   this.categories.forEach(
  //     (category) => (category.selected = this.allSelected)
  //   );
  // }

  // updateAllSelected() {
  //   this.allSelected = this.categories.every((category) => category.selected);
  // }

  onSignUp() {
    this.Router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.Router.navigateByUrl('sign-in');
  }
}
