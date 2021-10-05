import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
import authSlice from '../reducers/auth';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
  },
});
export default store;
