import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    //get all carts
    fetchCart: builder.query({
      query: () => `api/pets/cart`,
    }),
    fetchCartById: builder.query({
      query: (cartId) => `api/pets/cart/${cartId}`,
    }),

    fetchCartByUser: builder.query({
      query: (userId) => `api/pets/cart/${userId}`,
    }),

    createCart: builder.mutation({
      query: (newCart) => ({
        url: `api/pets/cart`,
        method: "POST",
        body: newCart,
      }),
    }),
  }),
});

export default cartApi;
export const {
  useFetchCartQuery,
  useFetchCartByIdQuery,
  useFetchCartByUserQuery,
  useCreateCartMutation,
} = cartApi;
