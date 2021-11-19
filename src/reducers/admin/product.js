import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/admin/product';
import { getResponseError } from '../../helpers';

const initialState = {
  productList: [],
  curPage: 1,
  numPage: 1,
  total: 1,
  loading: false,
  modifyLoading: false,
};

export const getAuctionProductList = createAsyncThunk(
  'product/getAuctionProductList',
  async ({page, limit}, { rejectWithValue }) => {
    try {
      return (await API.getAuctionProductList({page, limit})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const deleteAuctionProduct = createAsyncThunk(
  'product/deleteAuctionProductList',
  async (productId, { rejectWithValue }) => {
    try {
      return (await API.deleteAuctionProduct({prodId: productId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const userProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getAuctionProductList.pending]: (state) => {
      state.loading = true;
    },
    [getAuctionProductList.rejected]: (state) => {
      state.loading = false;
    },
    [getAuctionProductList.fulfilled]: (state, action) => {
      state.loading = false
      const { productList, curPage, numPage, total } = action.payload
      state.curPage = curPage
      state.numPage = numPage
      state.total = total
      state.productList = productList
    },
  },
});

export const userProductActions = userProductSlice.actions;
export default userProductSlice;
