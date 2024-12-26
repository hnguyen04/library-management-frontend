import axios from 'axios';
import Cookies from 'js-cookie';

import { IBaseHttpResponse } from '@/base/base.model';
import { httpService } from '@/base/http-service';
import { API_ENDPOINT } from '@/configs/constant.config';

import {
  ILoginInput,
  ILoginResult,
  IRefreshTokenResult,
  IRegisterInput,
  IRegisterResult,
  IUserInfo,
} from './auth.model';

class AuthService {
  async login(input: ILoginInput) {
    const response = await axios.post<IBaseHttpResponse<ILoginResult>>(
      `${API_ENDPOINT}/auth/Login`,
      input,
    );

    const data = response.data.result;

    Cookies.set('accessToken', data.token);

    return this.getUserInfo();
  }

  async getUserInfo() {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await httpService.request<IBaseHttpResponse<IUserInfo>>({
      url: '/users/MyInfo',
      method: 'GET',
    });

    return response.result;
  }

  async refreshToken() {
    try {

      const response = await axios.post<IBaseHttpResponse<IRefreshTokenResult>>(
        `${API_ENDPOINT}/auth/Refresh`,
      );

      const data = response.data.result;

      Cookies.set('accessToken', data.token);

      return true;
    } catch (error) {
      Cookies.remove('accessToken');
      window.location.href = '/auth/login';
      return false;
    }
  }

  async logout() {
    try {
      const response = await httpService.request<IBaseHttpResponse<null>>({
        url: '/auth/Logout',
        method: 'GET',
      });
      return response.success;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      Cookies.remove('accessToken');
      window.location.href = '/auth/login';
    }
  }

  async register(input: IRegisterInput) {
    const response = await axios.post<IBaseHttpResponse<IRegisterResult>>(
      `${API_ENDPOINT}/users/Create`,
      input,
    );
    const data = response.data.result;

    return data;
  }
}

const authService = new AuthService();

export default authService;
