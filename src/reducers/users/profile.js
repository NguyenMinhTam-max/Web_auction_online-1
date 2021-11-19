import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileApi from '../../apis/users/profile';
import { getResponseError } from '../../helpers';

const initialState = {
    data:[],
    loading: false,
    dataNewPass: [],
    dataFavorite: [],
    dataJoiningProduct: [],
    dataHighestPriceProduct:[],
    dataComment:[]
  };

export const getProfile = createAsyncThunk( 'profile/get', async(_, {rejectWithValue}) => {
    try {
      const response = (await profileApi.getProfile()).data.data;
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
});

export const accNewPassword = createAsyncThunk(
    'profile/NewPassword',
    async ({ userId, newpassword, oldpassword }, { rejectWithValue }) => {
        try {
            const response = await profileApi.accNewPassword({
                userId,
                newpassword,
                oldpassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

export const accUpdateprofiles = createAsyncThunk(
    'profile/upadateProfile',
    async ({ email, fullName, birthday, phoneNumber }, { rejectWithValue }) => {
        try {
            const response = await profileApi.accUpdateprofile({
                email, fullName, birthday, phoneNumber
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

export const getListFavoriteProducts = createAsyncThunk(
  'profile/getListFavoriteProducts',
  async ({ page, limit }, { rejectWithValue }) => {
      try {
          const response = await profileApi.getListFavoriteProduct({
              page,
              limit
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(getResponseError(error));
      }
  }
);

export const getListJoiningProducts = createAsyncThunk(
  'profile/getListJoiningProducts',
  async ({ page, limit }, { rejectWithValue }) => {
      try {
          const response = await profileApi.getListJoiningProduct({
              page,
              limit
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(getResponseError(error));
      }
  }
);

export const getListHighestPriceProducts = createAsyncThunk(
  'profile/getListHighestPriceProducts',
  async ({ page, limit }, { rejectWithValue }) => {
      try {
          const response = await profileApi.getListHighestPriceProduct({
              page,
              limit
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(getResponseError(error));
      }
  }
);

export const getListComments = createAsyncThunk(
  'profile/getListComments',
  async ({ page, limit }, { rejectWithValue }) => {
      try {
          const response = await profileApi.getListComment({
              page,
              limit
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(getResponseError(error));
      }
  }
);

export const deleteProductInWatchLists = createAsyncThunk(
  'profile/deleteProductInWatchLists',
  async ({ id }, { rejectWithValue }) => {
      try {
          const response = await profileApi.deleteProductInWatchList({id});
          return response.data;
      } catch (error) {
          return rejectWithValue(getResponseError(error));
      }
  }
);

export const addComments = createAsyncThunk(
  'profile/addComments',
  async ({ textComment, status, prodId }, { rejectWithValue }) => {
      try {
          const response = await profileApi.addComment({
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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
      [getProfile.pending]: (state, action) => {
        state.loading = true;
      },
      [getProfile.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getProfile.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      [accNewPassword.pending]: (state, action) => {
        state.loading = true;
      },
      [accNewPassword.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [accNewPassword.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataNewPass = action.payload;
      },
      [accUpdateprofiles.pending]: (state, action) => {
        state.loading = true;
      },
      [accUpdateprofiles.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [accUpdateprofiles.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [getListFavoriteProducts.pending]: (state, action) => {
        state.loading = true;
      },
      [getListFavoriteProducts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getListFavoriteProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataFavorite = action.payload
      },
      [getListJoiningProducts.pending]: (state, action) => {
        state.loading = true;
      },
      [getListJoiningProducts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getListJoiningProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataJoiningProduct = action.payload
      },
      [getListHighestPriceProducts.pending]: (state, action) => {
        state.loading = true;
      },
      [getListHighestPriceProducts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getListHighestPriceProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataHighestPriceProduct = action.payload
      },
      [getListComments.pending]: (state, action) => {
        state.loading = true;
      },
      [getListComments.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getListComments.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataComment = action.payload
      },
    },
  });

  export const profileActions = profileSlice.actions;
  export default profileSlice;