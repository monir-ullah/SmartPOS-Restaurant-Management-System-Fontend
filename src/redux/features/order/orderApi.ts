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
    
    // Get all orders
    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
} = orderApi;