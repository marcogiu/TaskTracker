import { apiService } from '../../service/apiService';

interface Data {
  email: string;
  password: string;
}

const USERS_URL = '/api/users';
const AUTH_URL = '/api/auth';

export const userSlice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: Data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    register: builder.mutation({
      query: (data: Data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data
      })
    }),

    getUserFromId: builder.query({
      query: (id: string) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET'
      })
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PATCH',
        body: data
      })
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUserFromIdQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;
