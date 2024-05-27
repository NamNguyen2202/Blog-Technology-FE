import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from './add-post.service';

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
  post: ItemData = {
    postName: '',
    content: '',
    photo: '',
    userId: 0,
    categoryId: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<AddArticleDialogComponent>,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // this.getUserName();
    this.loadCategories();
  }

  // getUserName(): string {
  //   const userName = localStorage.getItem('userName') || '';
  //   this.post.userId = parseInt(localStorage.getItem('userId') || '0', 10);
  //   return userName;
  // }

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
    this.post.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.articleService.addPost(this.post).subscribe({
      next: (response: any) => {
        console.log('Bài viết đã được đăng:', response);
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.error('Lỗi khi đăng bài viết:', error);
      },
      complete: () => {
        console.log('Đăng bài viết hoàn thành');
      }
    });
  }

  logData(): void {
    console.log('Dữ liệu từ form:', this.post);
  }
}
