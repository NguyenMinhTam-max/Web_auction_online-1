import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/admin/user';
import { getResponseError } from '../../helpers';

const initialState = {
  userList: [],
  numPage: 1,
  loading: false,
  modifyLoading: false,
};

export const getUserList = createAsyncThunk(
  'user/getUserList',
  async ({page, limit, role}, { rejectWithValue }) => {
    try {
      return (await API.getUserList({page, limit, role})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (accId, { rejectWithValue }) => {
    try {
      return (await API.deleteUser({accId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const acceptSel = createAsyncThunk(
  'user/acceptSel',
  async (accId, { rejectWithValue }) => {
    try {
      return (await API.acceptSel({accId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const rejectSel = createAsyncThunk(
  'user/rejectSel',
  async (accId, { rejectWithValue }) => {
    try {
      return (await API.rejectSel({accId})).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

// export const postAuctionProduct = createAsyncThunk(
//   'product/postAuctionProduct',
//   async (formData, { rejectWithValue }) => {
//     try {
//       return (await API.postAuctionProduct(formData)).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );

// export const updateAuctionProduct = createAsyncThunk(
//   'product/updateAuctionProduct',
//   async (formData, { rejectWithValue }) => {
//     try {
//       return (await API.updateAuctionProduct(formData)).data;
//     } catch (error) {
//       return rejectWithValue(getResponseError(error));
//     }
//   }
// );

const adminUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.loading = true;
    },
    [getUserList.rejected]: (state) => {
      state.loading = false;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.loading = false
      const { accountList, numPage  } = action.payload
      state.numPage = numPage
      state.userList = accountList
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

export const adminUserActions = adminUserSlice.actions;
export default adminUserSlice;
