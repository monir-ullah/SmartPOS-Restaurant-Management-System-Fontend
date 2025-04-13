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
        query: ({page =1, limit = 10, searchTerm = ''}) => ({
          url: `orders/get-all-orders?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

    
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['orders']
    }),
    

    // Delete food item
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/delete-signle-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),

    // Update the getIncomeReport query
    getIncomeReport: builder.query({
      query: ({ reportType, date, startDate, endDate }) => ({
        url: `/completed-orders/get-income`,
        method: 'GET',
        params: { reportType, date, startDate, endDate }
      }),
      providesTags: ["orders"],
      // Add data transformation
      transformResponse: (response: any) => {
        return {
          data: response.data || [],
          meta: response.meta
        };
      }
    }),
}),
});

export const {
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useGetIncomeReportQuery
} = orderApi;