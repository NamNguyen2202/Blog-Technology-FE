export interface User {
  userId?: number;
  userName: string;
  phone: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  userName?: string;
  message?: string;
}

export interface IChangePass {
  userName: string;
  currentPassword: string;
  newPassword: string;
}

export interface IChangePassword {
  success: boolean;
  userName?: string;
  message?: string;
}
