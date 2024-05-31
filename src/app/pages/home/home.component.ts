import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddArticleDialogComponent } from '../../components/add-post/add-post.component';
import { HomeService } from './home.service';
import { ICategory, IPost } from './interfaces/home.interface';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';

 interface IComment {
  postId: number;
  userId: number;
  userName: string;
  contentComment: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userId!: number; // UserId của người đăng nhập
  categories: ICategory[] = [];
  posts: IPost[] = [];
  comment: IComment[] = [];
  selectedCategoryIds: number[] = [];
  isAllCategoriesSelected: boolean = false;
  constructor(
    private router: Router,
    private homeService: HomeService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/sign-in');
    } else {
      const userName = this.getUserName();
      if (userName) {
        this.homeService.getUserId(userName).subscribe({
          next: (userId) => {
            this.userId = userId;
          },
          error: (err) => {
            console.error('Có lỗi xảy ra khi lấy userId:', err);
          },
        });
      }
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  getUserId() {
    const username = this.getUserName();
    if (username) {
      this.homeService.getUserId(username).subscribe({
        next: (userId) => {
          this.userId = userId;
        },
        error: (err) => {
          console.error('Có lỗi xảy ra khi lấy userId:', err);
        },
      });
    }
  }

  getCategories(): void {
    this.homeService.GetCategory().subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => ({
          ...category,
        }));
        console.log('Categories:', this.categories);
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
  onChangePass(): void {
    const dialogRef1 = this.dialog.open(ChangePasswordComponent, {
      width: '600px',
    });
    console.log('The dialog was opened');

    dialogRef1.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
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
        this.posts = post.map((p) => ({ ...p, newCommentContent: '' })); // Initialize newCommentContent
        this.posts.forEach((p) => this.getCommentsForPost(p));
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  getCommentsForPost(post: IPost): void {
    if (post.postId === undefined) {
      console.error('postId is undefined for post:', post);
      return;
    }
    this.homeService.getCommentsByPostId(post.postId).subscribe({
      next: (comments) => {
        post.comments = comments;
      },
      error: (err) => {
        console.error('Có lỗi xảy ra:', err);
      },
    });
  }

  addComment(post: IPost, content: string): void {
    if (post.postId === undefined) {
      console.error('postId is undefined for post:', post);
      return;
    }
    const userId = this.userId;
    if (!userId) {
      console.error('userId is not available.');
      return;
    }
  
    this.homeService.getUserName(userId).subscribe({
      next: (userName) => {
        const newComment: IComment = {
          postId: post.postId,
          userId: userId,
          userName: userName,
          contentComment: content,
        };
        console.log('New comment:', newComment);
        this.homeService.addComment(newComment).subscribe({
          next: (response) => {
            if (response.success) {
              this.getCommentsForPost(post);
              post.newCommentContent = ''; // Clear the input field after successful comment
            } else {
              console.error('Error adding comment:', response.message);
            }
          },
          error: (err) => {
            console.error('Có lỗi xảy ra:', err);
          },
        });
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi lấy userName từ userId:', err);
      },
    });
  }

  showAllPosts(): void {
    if (this.isLoggedIn()) {
      const userName = this.getUserName();
      if (userName) {
        this.homeService.getUserId(userName).subscribe({
          next: (userId) => {
            this.homeService.getAllPostsForUser(userId).subscribe({
              next: (posts) => {
                this.posts = posts;
                this.selectedCategoryIds = [];
                this.isAllCategoriesSelected = true;
              },
              error: (err) => {
                console.error('Có lỗi xảy ra khi lấy tất cả bài viết của người dùng:', err);
              }
            });
          },
          error: (err) => {
            console.error('Có lỗi xảy ra khi lấy userId từ userName:', err);
          }
        });
      }
    } else {
      console.error('Người dùng chưa đăng nhập');
    }
  }
  onSignUp() {
    this.router.navigateByUrl('sign-up');
  }

  onSignIn() {
    this.router.navigateByUrl('sign-in');
  } 
  toggleComments(post : IPost) {
    post.showComments = !post.showComments;
  }
}

  