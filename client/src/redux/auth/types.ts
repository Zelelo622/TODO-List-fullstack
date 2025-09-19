export interface IUser {
  userId: number;
  username: string;
}

export interface IUserMeResponse {
  user: IUser;
}

export interface IAuthState {
  isAuth: boolean;
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

export interface IAuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthErrorResponse {
  error: string;
}

export interface IAuthError {
  status?: number;
  data?: { error: string };
}

export type IAuthResponse = IAuthSuccessResponse | IAuthErrorResponse;
