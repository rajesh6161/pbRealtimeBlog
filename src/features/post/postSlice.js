import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import postService from './postService';

const initialState = {
  current_post: {},
  loading: false,
  error: false,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (payload, thunkAPI) => {
    try {
      await postService.createPost(payload);
      toast.success('Post successfully created!');
    } catch (error) {
      // set toast alert
      if (error.data.data['title']) {
        toast.error(error.data.data['title'].message);
      } else if (error.data.data['content']) {
        toast.error(error.data.data['content'].message);
      } else {
        toast.error('Something went wrong!');
      }

      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
