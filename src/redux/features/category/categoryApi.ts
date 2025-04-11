import { baseAPI } from "../baseApi";

export const categoryApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;