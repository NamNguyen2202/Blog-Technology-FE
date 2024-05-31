import { Post } from './components/add-post/interface/articles.interface';

export const BACKEND_HOST = 'http://localhost:3000/';

export const API_ENDPOINTS = {
  SIGN_UP: `${BACKEND_HOST}user/sign-up`,
  CHECK_SIGN_UP: (userName: string) =>
    `${BACKEND_HOST}user/sign-up/${userName}`,

  SIGN_IN: `${BACKEND_HOST}user/sign-in`,
  CHECK_SIGN_IN: (userName: string) =>
    `${BACKEND_HOST}user/sign-in/${userName}`,
  CHANGE_PASS: `${BACKEND_HOST}user/change-pass`,

  GET_CATEGORIES: `${BACKEND_HOST}category`,
  ADD_POST: `${BACKEND_HOST}post/insertpost`,

  CATEGORY_POST: `${BACKEND_HOST}category`,
  POST: `${BACKEND_HOST}post`,

  POST_ID: (category: string) => {
    return `${BACKEND_HOST}post/ids?categoryIds=${category}`;
  },
  GET_USER_ID_BY_USERNAME: (userName: string) =>
    `${BACKEND_HOST}user/userId/${userName}`,

  GET_USER_NAME_BY_USERID: (userId: number) =>
    `${BACKEND_HOST}user/userName/${userId}`,

  GET_COMMENTS_BY_POST_ID: (postId: number) => 
    `${BACKEND_HOST}comment/post/${postId}`,
  ADD_COMMENT: `${BACKEND_HOST}comment/add`,

  GET_ALLPOST_BY_USERID: (userId: number) =>
    `${BACKEND_HOST}post/user/${userId}`,
};
