import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ICategory, IPost } from './interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: ICategory[] = [];
  post: IPost[] = [];
  selectedCategoryIds: number[] = [];

  isCollapsed = false;
  constructor(private Router: Router, private homeService: HomeService) {}
  ngOnInit(): void {
    this.getCategories();
    this.getPost();
  }
  getCategories(): void {
    this.homeService.GetCategory().subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => ({
          ...category,
          selected: false,
        }));
        console.log('Danh sách danh mục:', categories);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  getPost(): void {
    if (this.selectedCategoryIds.length === 0) {
      this.homeService.GetPost().subscribe({
        next: (posts) => {
          this.post = posts;
        },
        error: (err) => {
          console.error('Có lỗi xảy ra:', err);
        },
      });
      return;
    }

    this.post = []; // Đặt lại danh sách bài viết
    this.selectedCategoryIds.forEach((categoryId) => {
      this.homeService.GetAllPostId(categoryId).subscribe({
        next: (posts) => {
          this.post = [...this.post, ...posts];
        },
        error: (err) => {
          console.error('Có lỗi xảy ra:', err);
        },
      });
    });
  }

  onSelectAllChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCategoryIds = this.categories.map(
        (category) => category.categoryId
      );
    } else {
      this.selectedCategoryIds = [];
    }
    this.getPost(); // Gọi hàm getPost để cập nhật danh sách bài viết
  }

  onCheckboxChange(category: ICategory): void {
    if (category.selected) {
      this.selectedCategoryIds.push(category.categoryId);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(
        (id) => id !== category.categoryId
      );
    }
    this.getPost(); // Gọi hàm getPost để cập nhật danh sách bài viết
  }

  onSignUp() {
    this.Router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.Router.navigateByUrl('sign-in');
  }
}
