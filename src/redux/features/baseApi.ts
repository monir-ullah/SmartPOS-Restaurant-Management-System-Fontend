import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating baseAPI
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/auth/",
    baseUrl: "http://localhost:5000/api/v1/",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { user: { token: string } }).user.token;

      if (token) {
        // Change this line
        headers.set("authorization", token);
        
        // To this
        headers.set("authorization", `${token}`);
        return headers;
      }
    },

  }),
  tagTypes: ["smartphones"],
  endpoints: (builder) => ({
    // user Registration into the system
    registerUser: builder.mutation({
      query: ({ username, password, role }) => ({
        url: "auth/user/registration",
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
        url: "auth/user/login",  // This creates a double "auth" in the URL
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
