import type { AuthUser, CoursesUser } from '@/types/User/User';
import api from './http';
import type { RegisterDto } from '@/types/Auth/ApiDto';

const controller = 'auth';

export const loginService = (
  email: string,
  password: string,
): Promise<AuthUser> => {
  return api
    .post<{ user: AuthUser }>(`/${controller}/signin`, { email, password })
    .then(r => r.data.user);
};

export const registerSVC = (payload: RegisterDto): Promise<AuthUser> => {
  return api.post<AuthUser>(`/${controller}/signup`, payload).then(r => r.data);
};

export const meSvc = (): Promise<AuthUser> => {
  return api.get<AuthUser>(`/${controller}/me`).then(r => r.data);
};

export const courseDataService = (): Promise<CoursesUser> => {
  return api.get<CoursesUser>(`/${controller}/my-data`).then(r => r.data);
};
