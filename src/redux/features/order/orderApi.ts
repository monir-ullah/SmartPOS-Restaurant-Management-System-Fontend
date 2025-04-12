import { baseAPI } from "../baseApi";

export const orderApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "orders/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    
    /// Get single food item
    getSingleOrder: builder.query({
      query: (orderId) => `orders/get-signle-order/${orderId}`,
      providesTags: ["orders"],
    }),

    getAllOrders: builder.query({
        query: (searchTerm = '') => ({
          url: `orders/get-all-orders?searchTerm=${searchTerm}`,
          method: "GET",
        }),
        transformResponse: (response: any) => {
          return {
            orders: response.data,
            meta: response.meta,
          };
        },
        providesTags: ["orders"],
    }),

    
    // Delete food item
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/delete-signle-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),


  }),
});

export const {
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = orderApi;