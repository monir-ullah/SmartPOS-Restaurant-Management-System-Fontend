import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    credentials: "include",
    // headers for authorization token
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [ "categories", "tables"], // Add tables tag
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
        url: "auth/user/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),

    // Create Category
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "category/category/create",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["categories"],
    }),

    // Get categories with pagination and search
    getCategories: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = '' }) => 
        `category/category?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      providesTags: ["categories"],
    }),

    // Get single category
  getSingleCategory: builder.query({
    query: (categoryId) => `category/category/${categoryId}`,
    providesTags: ["categories"],
  }),

  // Update category
  updateCategory: builder.mutation({
    query: ({ categoryId, ...data }) => ({
      url: `category/category/${categoryId}`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["categories"],
  }),

  // Delete category
  deleteCategory: builder.mutation({
    query: (id) => ({
      url: `category/category/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["categories"],
  }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = baseAPI;
