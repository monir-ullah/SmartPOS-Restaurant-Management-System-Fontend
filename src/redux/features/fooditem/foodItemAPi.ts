import { baseAPI } from "../baseApi";

export const foodItemApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Create Food Item
    createFoodItem: builder.mutation({
      query: (foodData) => ({
        url: "foods/create-food",
        method: "POST",
        body: foodData,
      }),
      invalidatesTags: ["foodItems"],
    }),

    // Get food items with pagination and search
    getFoodItems: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = '' }) => 
        `foods/get-all-food-items?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      providesTags: ["foodItems"],
    }),

    // Get single food item
    getSingleFoodItem: builder.query({
      query: (id) => `foods/get-single-food-item/${id}`,
      providesTags: ["foodItems"],
    }),

    // Update food item
    updateFoodItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `foods/update-single-fodd-item/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["foodItems"],
    }),

    // Delete food item
    deleteFoodItem: builder.mutation({
      query: (id) => ({
        url: `foods/delete-single-food-itme/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["foodItems"],
    }),
  }),
});

export const {
  useCreateFoodItemMutation,
  useGetFoodItemsQuery,
  useGetSingleFoodItemQuery,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
} = foodItemApi;
