import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import postService, { PostData, EditPostData } from './postService';
import { RootState } from '../../store';
import { RecordModel } from 'pocketbase';

interface PostState {
  updatedPost: Partial<RecordModel>;
  loading: boolean;
  del_loading: boolean;
  isDeleted: boolean;
  error: string | null;
}

const initialState: PostState = {
  updatedPost: {},
  loading: false,
  del_loading: false,
  isDeleted: false,
  error: null,
};

// Helper function to handle error messages
const handleErrorMessage = (error: any) => {
  const errorData = error?.data?.data || {};
  const fields = ['title', 'content', 'imgurl'];
  
  for (const field of fields) {
    if (errorData[field]) {
      toast.error(errorData[field].message);
      return;
    }
  }
  
  toast.error('Something went wrong!');
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (payload: PostData, { rejectWithValue }) => {
    try {
      console.log(payload)  
      const response = await postService.createPost(payload);
      toast.success('Post successfully created!');
      return response;
    } catch (error: any) {
      handleErrorMessage(error);
      return rejectWithValue(error?.data?.message || 'Failed to create post');
    }
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async (data: EditPostData, { rejectWithValue }) => {
    try {
      const response = await postService.editPost(data);
      toast.success('Post successfully updated!');
      return response;
    } catch (error: any) {
      handleErrorMessage(error);
      return rejectWithValue(error?.data?.message || 'Failed to edit post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (recId: string, { rejectWithValue }) => {
    try {
      await toast.promise(
        postService.deletePost(recId),
        {
          pending: 'Deleting post...',
          success: 'Post successfully deleted!',
          error: 'Unable to delete post!'
        }
      );
      return recId;
    } catch (error: any) {
      console.error('Delete error:', error);
      return rejectWithValue(error?.data?.message || 'Failed to delete post');
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostState: (state) => {
      state.isDeleted = false;
      state.error = null;
      state.updatedPost = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Edit Post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedPost = action.payload;
        state.error = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.del_loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.del_loading = false;
        state.isDeleted = true;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.del_loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetPostState } = postSlice.actions;

// Selectors
export const selectUpdatedPost = (state: RootState) => state.post.updatedPost;
export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostDelLoading = (state: RootState) => state.post.del_loading;
export const selectPostError = (state: RootState) => state.post.error;
export const selectIsDeleted = (state: RootState) => state.post.isDeleted;

export default postSlice.reducer;
