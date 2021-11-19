import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../apis/admin/category';
import { getResponseError } from '../../helpers';

const initialState = {
  userList: [],
  numPage: 1,
  loading: false,
  modifyLoading: false,
};



export const getListCategory = createAsyncThunk(
    'adminCategory/ListParent',
    async ({page, limit}, { rejectWithValue }) => {
    try {
      const categoryList = (await categoryApi.getListCategory({page, limit})).data
      return categoryList;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  });


  export const addCategory = createAsyncThunk(
    'adminCategory/addCategory',
    async ({catName}, { rejectWithValue }) => {
    try {
      const response = (await categoryApi.addCategory({catName})).data
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  });

  export const updateCategory = createAsyncThunk(
    'adminCategory/updateCategory',
    async ({catID, catName, catParentID}, { rejectWithValue }) => {
    try {
      const response = (await categoryApi.updateCategory({catID, catName, catParentID})).data
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  });

  export const deleteCategory = createAsyncThunk(
    'adminCategory/deleteCategory',
    async ({catID}, { rejectWithValue }) => {
    try {
     
      const response = (await categoryApi.deleteCategory({catID})).data
      
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  });


const adminUserSlice = createSlice({
  name: 'adminCategory',
  initialState,
  reducers: {},
  extraReducers: {
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false
      const { CategoryList, totalPage  } = action.payload
      state.totalPage = totalPage
      state.CategoryList = CategoryList
    },
  },
});

export const adminUserActions = adminUserSlice.actions;
export default adminUserSlice;
