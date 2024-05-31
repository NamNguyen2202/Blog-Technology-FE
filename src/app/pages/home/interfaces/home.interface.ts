export interface ICategory {
  categoryId: number;
  categoryName: string;
  selected?: boolean;
}

export interface IPost {
showComments: any;
  postId: number; // Ensure postId is always defined
  postName: string;
  categoryName: string;
  content: string;
  photo?: string;
  comments?: IComment[];
  newCommentContent: string;
}

export interface IUser {
  userId : number;
  userName: string;
}

export interface IComment {
    postId: number;
    userId: number;
    userName: string;
    contentComment: string;
}
