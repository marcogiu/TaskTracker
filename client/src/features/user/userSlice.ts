import { apiService } from '../../service/apiService';
import { User } from '../../models';

interface Data {
  email: string;
  password: string;
}

interface UpdateData {
  id: string;
  data: {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export interface LoginResponse {
  token: string;
  _id: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    access_token: string;
    user: {
      id: string;
    };
  };
}

interface UpdateUserResponse {
  user: User;
}

interface DeleteUserResponse {
  success: boolean;
}

const USERS_URL = '/api/users';
const AUTH_URL = '/api/auth';

export const userSlice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Data>({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    register: builder.mutation<RegisterResponse, Data>({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data
      })
    }),

    getUserFromId: builder.query<User, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET'
      })
    }),

    updateUser: builder.mutation<UpdateUserResponse, UpdateData>({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PATCH',
        body: data
      })
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUserFromIdQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;
