import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddArticleDialogComponent } from '../../components/add-post/add-post.component';
import { HomeService } from './home.service';
import { ICategory, IPost } from './interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId!: number; // UserId của người đăng nhập
  categories: ICategory[] = [];
  posts: IPost[] = [];
  selectedCategoryIds: number[] = [];
  isAllCategoriesSelected: boolean = false;
  constructor(private router: Router, private homeService: HomeService,public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
     this.getCategories();
    this.getPost();
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/sign-in');
    } else {
      const userIdString = localStorage.getItem('userId');
      this.userId = userIdString ? +userIdString : 0; 
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userName');
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/sign-in');
  }

  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(AddArticleDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
