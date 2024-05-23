export interface ICategory {
  categoryId: number;
  categoryName: string;
  selected?: boolean;
}

export interface IPost {
  postId?: number;
  postName: string;
  content: string;
  photo: string;
  userId?: number;
  categoryId?: number;
  categoryName?: string;
}
