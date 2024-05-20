export interface SignInUser {
  userName: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  userName?: string;
  message?: string;
}
