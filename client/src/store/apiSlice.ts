import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API configuration
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3000-monospace-tasktracker-1714681167897.cluster-23wp6v3w4jhzmwncf7crloq3kw.cloudworkstations.dev/api",
  }),
  endpoints: () => ({}),
});
