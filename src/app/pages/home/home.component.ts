import { Component, OnInit } from '@angular/core';
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
  posts: IPost[] = [];
  selectedCategoryIds: number[] = [];
  isAllCategoriesSelected: boolean = false;

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
  }

  getCategories(): void {
    this.homeService.GetCategory().subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => ({
          ...category,
        }));
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  selectAllCategories(event: any): void {
    if (event.target.checked) {
      this.isAllCategoriesSelected = true;
      this.selectedCategoryIds = [];
    } else {
      this.isAllCategoriesSelected = false;
    }
    this.getPost();
  }

  onCheckboxChange(event: any, categoryId: number) {
    if (this.isAllCategoriesSelected) {
      this.isAllCategoriesSelected = false;
    }

    if (event.target.checked) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(
        (id) => id !== categoryId
      );
    }

    this.getPost();
  }

  getPost(): void {
    this.homeService.GetAllPostId(this.selectedCategoryIds).subscribe({
      next: (post) => {
        this.posts = post;
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
