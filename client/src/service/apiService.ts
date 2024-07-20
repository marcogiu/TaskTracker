import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { logout } from '../features/auth/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const { token } = JSON.parse(userInfo);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    }
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo') as string)?.refreshToken}`
        }
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Store the new token
      const { token } = refreshResult.data as { token: string };
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      const newUserInfo = { ...userInfo, token };
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      +api.dispatch(logout());
    }
  }

  return result;
};

const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Task'],
  endpoints: () => ({})
});

export default apiService;
