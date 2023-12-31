import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("profileDetails")) || null,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    logout: (state, { payload }) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("profileDetails");
      localStorage.removeItem("cartItems");
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        localStorage.setItem("cartItems", []);
        return { token: payload.token, user: payload.user };
      }
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        localStorage.setItem("cartItems", JSON.stringify(payload.user.cart[0].cartItem));
        return {
          token: payload.token,
          user: payload.user,
          cartItems: payload.user.cart[0].cartItem,
        };
      }
    );
    builder.addMatcher(
      authApi.endpoints.guestLogin.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        localStorage.setItem("cartItems", []);
        return { token: payload.token, user: payload.user };
      }
    );
  },
});

export default tokenSlice.reducer;
export const selectUser = (state) => state.token.user;
export const selectUserWithToken = (state) => state.token;

export const { logout } = tokenSlice.actions;
