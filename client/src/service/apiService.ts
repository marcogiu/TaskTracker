import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('Token set in headers:', token); // Aggiungi questo per debug
      }
    }
    return headers;
  }
});

export const apiService = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: () => ({})
});
