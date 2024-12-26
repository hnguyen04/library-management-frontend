export interface ILoginInput {
  name: string;
  password: string;
}

export interface ILoginResult {
  token: string;
  authenticated: boolean;
}

export interface IRegisterInput {
  name: string;
  userName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface IRegisterResult {
  id: string,
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  roleName: string;
}

export interface GetUserInfoApiParams {
  accessToken: string;
}

export interface IUserInfo {
  userName?: string;
  name: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  roleName: string;
  id: string;
}

export interface IRefreshTokenResult {
  token: string;
}

export interface IAuthState {

  currentUser?: IUserInfo;
  isAuth: boolean;
}

export type TAuthActionType = 'logout' | 'setIsAuth' | 'setCurrentUser';
