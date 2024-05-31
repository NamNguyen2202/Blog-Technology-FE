import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from './add-post.service';
import { Router } from '@angular/router';
import { User } from '../../common/interfaces/user.interface';

interface ItemData {
  postName: string;
  content: string;
  photo: string;
  userId: number;
  categoryId: number;
}

interface Category {
  categoryId: number;
  categoryName: string;
}

@Component({
  selector: 'app-add-article-dialog',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddArticleDialogComponent implements OnInit {
  categories: Category[] = [];
  userId: User[]=[];
  post: ItemData = {
    postName: '',
    content: '',
    photo: '',
    userId: 0,
    categoryId: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<AddArticleDialogComponent>,
    private articleService: ArticleService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUserId();
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  loadCategories(): void {
    this.articleService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadUserId(): void {
    const username = this.getUserName();
    if (username) {
      this.articleService.getUserId(username).subscribe(
        (data: number) => {
          this.post.userId = data;
        },
        (error: any) => {
          console.error('Error fetching userId:', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.post.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitArticle(): void {
    this.logData();
    console.log(this.post);
    this.articleService.addPost(this.post).subscribe({
      next: (response: any) => {
        console.log('Bài viết đã được đăng:', response);
        this.dialogRef.close();
        this.router.navigateByUrl('').then(() => {
          window.location.reload(); // Force reload to see the new post
        });
      },
      error: (error: any) => {
        console.error('Lỗi khi đăng bài viết:', error);
      },
      complete: () => {
        console.log('Đăng bài viết hoàn thành');
      },
    });
  }

  logData(): void {
    console.log('Dữ liệu từ form:', this.post);
  }
}
