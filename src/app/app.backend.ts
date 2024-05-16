export const BACKEND_HOST = 'http://localhost:3000';

export const API_ENDPOINTS = {
  SIGN_IN: `${BACKEND_HOST}/user/sign-in`,
  CHECK_SIGN_IN: (userName: string) =>
    `${BACKEND_HOST}/user/sign-in/${userName}`,
};
