import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bidderApi from '../../apis/users/bidder';
import { getResponseError } from '../../helpers';

const initialState = {
  datas: [],
  loading: false,
};

export const bidProduct = createAsyncThunk(
  'history/Post',
  async ({priceBid, prodId}, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidProduct({ priceBid, prodId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const bidAddWatchList = createAsyncThunk(
  'addWatchList/Post',
  async ({ prodId }, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidAddWatchList({ prodId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const bidDeleteWatchList = createAsyncThunk(
  'deleteWatchList/Post',
  async ({favId}, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidDeleteWatchList({ favId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const requestUpgradeSeller = createAsyncThunk(
  'upgrageSeller',
  async ({accIsUpgrade = 1}, { rejectWithValue }) => {
    console.log('test')
  try {
      const result = (await bidderApi.requestUpgrade({accIsUpgrade}));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const bidderSlice = createSlice({
  name: 'bidProduct',
  initialState,
  reducers: {},
  extraReducers: {
      [bidProduct.fulfilled]: (state, action) => {
        state.loading = false;
        state.datas = action.payload;
      },
  },
});

export const postAuctionComment = createAsyncThunk(
  'addCommentSeller/Post',
  async ({ accSeller, accIsLike, accComment }, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidAddComment({ accSeller, accIsLike, accComment  }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});


export const getSellerComment = createAsyncThunk(
  'addCommentSeller/Post',
  async ({ prodID, page, limit }, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.getSellerComment({page, limit, prodID  }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const userProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getSellerComment.pending]: (state) => {
      state.loading = true;
    },
    [getSellerComment.rejected]: (state) => {
      state.loading = false;
    },
    [getSellerComment.fulfilled]: (state, action) => {
      state.loading = false
      // const { productList, curPage, numPage, total } = action.payload
      // state.curPage = curPage
      // state.numPage = numPage
      // state.total = total
      // state.productList = productList
    },

    // [postAuctionProduct.pending]: (state) => {
    //   state.modifyLoading = true;
    // },
    // [postAuctionProduct.rejected]: (state) => {
    //   state.modifyLoading = false;
    // },
    // [postAuctionProduct.fulfilled]: (state) => {
    //   state.modifyLoading = false;
    // },
    
    // [updateAuctionProduct.pending]: (state) => {
    //   state.modifyLoading = true;
    // },
    // [updateAuctionProduct.rejected]: (state) => {
    //   state.modifyLoading = false;
    // },
    // [updateAuctionProduct.fulfilled]: (state) => {
    //   state.modifyLoading = false;
    // },
  },
});


export const bidderActions = bidderSlice.actions;
export default bidderSlice;
