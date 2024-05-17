export interface User {
    userId: number;
    userName: string;
    phone: string;
    password: string;
  }

  export interface SignInUser {
    userName: string;
    password: string;
  }

  export interface SignInResponse {
    success: boolean;
    message?: string;
    userName?: string; 
    password?: string;// hoặc bất kỳ thông tin nào khác bạn muốn trả về
  }
  