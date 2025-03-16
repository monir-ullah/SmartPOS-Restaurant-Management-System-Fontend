import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating baseAPI
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/auth/",
  }),
  tagTypes: ["smartphones"],
  endpoints: (builder) => ({
    // user Registration into the system
    registerUser: builder.mutation({
      query: ({ username, password, role }) => ({
        url: "user/registration",
        method: "POST",
        body: {
          username,
          password,
          role,
        },
      }),
    }),

    // User Login for getting data
    loginUser: builder.mutation({
      query: ({ username, password }) => ({
        url: "user/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
  }),
});

// All hooks from baseAPI
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = baseAPI;
