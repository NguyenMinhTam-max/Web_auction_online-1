import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/users/product';
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

export const getAuctionProductEndList = createAsyncThunk(
  'product/getAuctionProductEndList',
  async ({page, limit}, { rejectWithValue }) => {
    try {
      return (await API.getAuctionProductEndList({page, limit})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const addComments = createAsyncThunk(
  'product/addComments',
  async ({ textComment, status, prodId }, { rejectWithValue }) => {
      try {
          const response = await API.addComment({
            Comment: textComment,
            Status: status,
            prodId
          });
          return response.data;
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

export const getCommentByProducts = createAsyncThunk(
  'product/getCommentByProducts',
  async (productId, { rejectWithValue }) => {
    try {
      return (await API.getCommentByProduct({prodId: productId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const postAuctionProduct = createAsyncThunk(
  'product/postAuctionProduct',
  async (formData, { rejectWithValue }) => {
    try {
      return (await API.postAuctionProduct(formData)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const updateAuctionProduct = createAsyncThunk(
  'product/updateAuctionProduct',
  async (formData, { rejectWithValue }) => {
    try {
      return (await API.updateAuctionProduct(formData)).data;
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

    [postAuctionProduct.pending]: (state) => {
      state.modifyLoading = true;
    },
    [postAuctionProduct.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [postAuctionProduct.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
    
    [updateAuctionProduct.pending]: (state) => {
      state.modifyLoading = true;
    },
    [updateAuctionProduct.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [updateAuctionProduct.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const userProductActions = userProductSlice.actions;
export default userProductSlice;
