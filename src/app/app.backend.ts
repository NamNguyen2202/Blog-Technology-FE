import { Post } from './components/add-post/interface/articles.interface';

export const BACKEND_HOST = 'http://localhost:3000/';

export const API_ENDPOINTS = {
  SIGN_UP: `${BACKEND_HOST}user/sign-up`,
  CHECK_SIGN_UP: (userName: string) =>
    `${BACKEND_HOST}user/sign-up/${userName}`,

  SIGN_IN: `${BACKEND_HOST}user/sign-in`,
  CHECK_SIGN_IN: (userName: string) =>
    `${BACKEND_HOST}user/sign-in/${userName}`,

  GET_CATEGORIES: `${BACKEND_HOST}category`,
  ADD_POST: `${BACKEND_HOST}post/insertpost`,
};
