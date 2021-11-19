import { Satellite } from '@material-ui/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import homeCategoryApi from '../apis/homeCategory';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  dataProductByCate: [],
  loading: false,
};

export const getHomeCategory = createAsyncThunk(
  'homeCategory/GetList',
  async (_, { rejectWithValue }) => {
  try {
    const catList = (await homeCategoryApi.geHomepageCategory()).data
    return catList;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const getProductByCategory = createAsyncThunk(
  'homeCategory/GetListProduct',
  async ({page,limit, catID}, { rejectWithValue }) => {
  try {
    const productList = (await homeCategoryApi.getProductByCategory(page, limit, catID)).data
    return productList;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const honeCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getHomeCategory.pending]: (state) => {
      state.loading = true;
    },
    [getHomeCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getHomeCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getProductByCategory.pending]: (state) => {
      state.loading = true;
    },
    [getProductByCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getProductByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataProductByCate = action.payload;
    },
  },
});

export const adminCategoryActions = honeCategorySlice.actions;
export default honeCategorySlice;