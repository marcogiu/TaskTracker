import { api } from "./apiSlice";

interface LoginData {
  email: string;
  password: string;
}

const USERS_URL = "users"; // Simplified path, assuming base URL includes `/api`

export const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`, // Assuming you need to specify user ID
        method: "PATCH",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`, // Assuming you need to specify user ID
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSlice;
