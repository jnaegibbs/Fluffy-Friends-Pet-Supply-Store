import { configureStore } from '@reduxjs/toolkit';

import authApi from './authApi';
import orderApi from './orderApi';
import tokenReducer from './tokenSlice';
import productsApi from './productsApi';
import inventoryApi from './inventoryApi';
import cartApi from './cartApi';
import cartItemApi from './cartItemApi';
import reviewApi from './reviewApi';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [productsApi.reducerPath]:productsApi.reducer,
        [inventoryApi.reducerPath]:inventoryApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer,
        [cartItemApi.reducerPath]:cartItemApi.reducer,
        [reviewApi.reducerPath]:reviewApi.reducer,
        token: tokenReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(
        authApi.middleware,
        orderApi.middleware,
        productsApi.middleware,
        inventoryApi.middleware,
        cartApi.middleware,
        cartItemApi.middleware,
        reviewApi.middleware
     ),
});

export default store;