import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import unauthorizedProductApi from '../apis/unauthorizedProduct';
import { getResponseError } from '../helpers';

let initialState = {//default state, this value will be gotten from use selector
  loading: false,
  data: [],
  dataProductDetail: [],
  SocketInProductDetail: 0,//these variables will be stored in local store, and can access with useSelector in page
  SocketInProductHome: 0,
  SocketInNotify: 0
};

export const getProductDetail = createAsyncThunk(
  'userProduct/GetDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.getProductDetail(id)).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);


export const getProductByCategory = createAsyncThunk(
  'userProduct/GetProductByCat',
  async ({ page, limit, catID, prodID}, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.getProductByCategory(page, limit, catID, prodID)).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductAboutToEnd = createAsyncThunk(
  'userProduct/listProductAboutToEnd',
  async (_, { rejectWithValue }) => {//no parameter in reducer, put "_"
    try {
      var value = (await unauthorizedProductApi.listProductAboutToEnd()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductHighestPrice = createAsyncThunk(
  'userProduct/listProductHighestPrice',
  async (_, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.listProductHighestPrice()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductHighestBid = createAsyncThunk(
  'userProduct/listProductHighestBid',
  async (_, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.listProductHighestBid()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductSearch = createAsyncThunk(
  'userProduct/listSearchProduct',
  async ({searchKey, limit, page, orderBy, filterField, AndOrCondition}, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.searchProduct(searchKey, limit, page, orderBy, filterField, AndOrCondition)).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const unauthorizedProductSlice = createSlice({
  name: 'userProduct',
  initialState,
  reducers: {
    EditSocketInDetail(state) {
        state.SocketInProductDetail += 1
    },
    EditSocketInHome(state) {
      state.SocketInProductHome += 1
    },
    EditSocketInNotify(state) {
      state.SocketInNotify += 1
    },
    ResetSocketInNotify(state){
      state.SocketInNotify = 0
    }
  },
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetail.rejected]: (state) => {
      state.loading = false;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataProductDetail = action.payload//store variable in here at local store
    },
    [getProductByCategory.pending]: (state) => {
      state.loading = true;
    },
    [getProductByCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getProductByCategory.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductAboutToEnd.pending]: (state) => {
      state.loading = true;
    },
    [listProductAboutToEnd.rejected]: (state) => {
      state.loading = false;
    },
    [listProductAboutToEnd.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductHighestPrice.pending]: (state) => {
      state.loading = true;
    },
    [listProductHighestPrice.rejected]: (state) => {
      state.loading = false;
    },
    [listProductHighestPrice.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductHighestBid.pending]: (state) => {
      state.loading = true;
    },
    [listProductHighestBid.rejected]: (state) => {
      state.loading = false;
    },
    [listProductHighestBid.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductSearch.pending]: (state) => {
      state.loading = true;
    },
    [listProductSearch.rejected]: (state) => {
      state.loading = false;
    },
    [listProductSearch.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});
//export action to using redux hook
export const unauthorizedProduct = unauthorizedProductSlice.actions;
export default unauthorizedProductSlice;
