export interface Post {
    postId?: number;
    postName: string;
    content: string;
    photo: string;
    userId: number;
    categoryId: number;
  }
  
  export interface AddPost {
    success: boolean;
    postId?: number;
    message?: string;
  }
  
  