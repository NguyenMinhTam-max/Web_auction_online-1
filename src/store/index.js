import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
import homeCategoryRedu from '../reducers/homeCategory';
import historyRedu from '../reducers/historyBid';

import authSlice from '../reducers/auth';
import selProductRedu from '../reducers/users/product';
import admCatoryRedu from '../reducers/admin/category';
import admUserRedu from '../reducers/admin/user';
import admSubCategoryRedu from '../reducers/admin/subCategory'
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
import bidderRedu from '../reducers/users/bidder';
import unauthorizedProductRedu from '../reducers/unauthorizedProduct';
import profileSlice from '../reducers/users/profile';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer,
    unauthorizedProduct: unauthorizedProductRedu.reducer,
    homeCategory: homeCategoryRedu.reducer,
    history: historyRedu.reducer,
    bidder: bidderRedu.reducer,
    profile: profileSlice.reducer,
    
    auth: authSlice.reducer,
    selProduct: selProductRedu.reducer,
    admCategory:admCatoryRedu.reducer,
    admUser: admUserRedu.reducer,
    admSubcategory: admSubCategoryRedu.reducer,
    ui: uiSlice.reducer,
    lang: langSlice.reducer,
  },
});

export default store;