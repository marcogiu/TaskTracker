import { apiService } from "../../service/apiService";

interface Data {
  email: string;
  password: string;
}

const USERS_URL = "/api/users";

export const userSlice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: Data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data: Data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
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