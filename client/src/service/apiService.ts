import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://task-tracker-server-chi.vercel.app/",
  prepareHeaders: (headers) => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const apiService = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
