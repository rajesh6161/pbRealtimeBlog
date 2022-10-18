import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import postService from './postService';

const initialState = {
  updatedPost: {},
  loading: false,
  del_loading: false,
  isDeleted: false,
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
      } else if (error.data.data['imgurl']) {
        toast.error(error.data.data['imgurl'].message);
      } else {
        toast.error('Something went wrong!');
      }

      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async (data, thunkAPI) => {
    try {
      const res = await postService.editPost(data);
      toast.success('Post successfully updated!');
      return res;
    } catch (error) {
      if (error.data.data['title']) {
        toast.error(error.data.data['title'].message);
      } else if (error.data.data['content']) {
        toast.error(error.data.data['content'].message);
      } else if (error.data.data['imgurl']) {
        toast.error(error.data.data['imgurl'].message);
      } else {
        toast.error('Something went wrong!');
      }

      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (recId, thunkAPI) => {
    // const resolveAfter3Sec = new Promise((resolve) =>
    //   setTimeout(resolve, 3000)
    // );
    try {
      toast.promise(postService.deletePost(recId), {
        pending: 'Deleting post...',
        success: 'Post successfully deleted!',
        error: 'Unable to delete post!',
      });
      // await postService.deletePost(recId);
      // toast.success('Post successfully deleted!');
    } catch (error) {
      console.log(error.data);
      toast.error('Something went wrong!');
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
    [editPost.pending]: (state) => {
      state.loading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedPost = action.payload;
    },
    [editPost.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [deletePost.pending]: (state) => {
      state.del_loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.del_loading = false;
      state.isDeleted = true;
    },
    [deletePost.rejected]: (state) => {
      state.del_loading = false;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
