import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddArticleDialogComponent } from '../../components/add-post/add-post.component';

interface ItemData {
  postId: number;
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: ItemData[] = [];
  categories: Category[] = [];
  userId!: number; // UserId của người đăng nhập
  postForm: any = {
    postName: '',
    content: '',
    photo: '',
    categoryId: '',
  };

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/sign-in');
    } else {
      const userIdString = localStorage.getItem('userId');
      this.userId = userIdString ? +userIdString : 0; 
      this.fetchPosts(); 
      this.fetchCategories();
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

  fetchPosts(): void {
    this.http.get<ItemData[]>('http://localhost:3000/post')
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  fetchCategories(): void {
    this.http.get<Category[]>('http://localhost:3000/category')
      .subscribe(categories => {
        this.categories = categories;
      }, error => {
        console.error('Error fetching categories:', error);
      });
  }
  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(AddArticleDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addPost(): void {
    // Gọi API hoặc service để thêm bài viết mới
    this.http.post<any>('http://localhost:3000/post/insertpost', {
      ...this.postForm,
      userId: this.userId,
    }).subscribe(response => {
      console.log('New post added:', response);
      // Sau khi thêm thành công, có thể làm một số điều gì đó, ví dụ như cập nhật danh sách bài viết
      this.fetchPosts(); // Cập nhật danh sách bài viết sau khi thêm mới
    }, error => {
      console.error('Error adding new post:', error);
    });
  }

  isCollapsed = false;

  onSignUp() {
    this.router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.router.navigateByUrl('sign-in');
  }
}
