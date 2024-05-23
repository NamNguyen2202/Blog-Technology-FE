import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-article-dialog',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css']
})
export class AddArticleDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddArticleDialogComponent>) {}
 
  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }
  
  submitArticle(): void {
    // Xử lý đăng bài viết ở đây
    this.dialogRef.close();
  }

}
