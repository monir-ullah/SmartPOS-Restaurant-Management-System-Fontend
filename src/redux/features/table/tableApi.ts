import { baseAPI } from "../baseApi";

export const tableApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createTable: builder.mutation({
      query: (tableData) => ({
        url: "tables/create-table",
        method: "POST",
        body: tableData,
      }),
      invalidatesTags: ["tables"],
    }),
    getTables: builder.query({
      query: ({ page = 1, limit = 10 }) => 
        `tables/get-all-tables?page=${page}&limit=${limit}`,
      providesTags: ["tables"],
    }),
    getSingleTable: builder.query({
      query: (tableId) => `tables/get-single-table/${tableId}`,
      providesTags: ["tables"],
    }),
    updateTable: builder.mutation({
      query: ({ tableId, ...data }) => ({
        url: `tables/update-table/${tableId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tables"],
    }),
    deleteTable: builder.mutation({
      query: (tableId) => ({
        url: `tables/delete-table/${tableId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tables"],
    }),
  }),
});

export const { 
  useCreateTableMutation,
  useGetTablesQuery,
  useGetSingleTableQuery,
  useUpdateTableMutation,
  useDeleteTableMutation
} = tableApi;