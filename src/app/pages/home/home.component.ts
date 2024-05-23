import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ICategory, IPost } from './interfaces/home.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: ICategory[] = [];
  post: IPost[] = [];
  selectedCheckboxIds: number[] = [];

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.getCategories();
    // this.getPost();
  }
  getCategories(): void {
    this.homeService.GetCategory().subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => ({
          ...category,
        }));
        console.log('Danh sách danh mục:', categories);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  selectAllCategories(): void {
    this.selectedCheckboxIds = [];
    this.getPost();
  }

  onCheckboxChange(category: any) {
    if (category.selected) {
      this.selectedCheckboxIds.push(category.id);
    } else {
      const index = this.selectedCheckboxIds.indexOf(category.id);
      if (index !== -1) {
        this.selectedCheckboxIds.splice(index, 1);
      }
    }
    console.log('Selected Checkbox IDs:', this.selectedCheckboxIds);
    this.getPost();
  }

  getPost(): void {
    this.homeService.GetAllPostId(this.selectedCheckboxIds).subscribe({
      next: (post) => {
        this.post = post.map((post) => ({
          ...post,
        }));
        console.log('Danh sách bài viết:', post);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  onSignUp() {
    this.router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.router.navigateByUrl('sign-in');
  }
}
