import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  loading: false,
  error: null,
  loggedIn: false,
  isRegistered: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      const res = await authService.login(payload);
      // alert
      toast.success('Login successful');
      return res;
    } catch (err) {
      // alert
      toast.error(err.data.message);
      return thunkAPI.rejectWithValue({ error: err.data.message });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      const res = await authService.register(payload);
      // alert
      toast.success('Registeration successful');
      return res;
    } catch (error) {
      // alert
      let err = error.data.data;
      if (err.email) {
        toast.error(err.email.message);
      } else if (err.password) {
        toast.error(err.password.message);
      } else if (err.passwordConfirm) {
        toast.error(err.passwordConfirm.message);
      } else {
        toast.error('Something went wrong!');
      }
      return thunkAPI.rejectWithValue({ error: err });
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.loggedIn = false;
    },
    setUserLoggedIn: (state) => {
      let pocketbase_auth = localStorage.getItem('pocketbase_auth');
      pocketbase_auth = JSON.parse(pocketbase_auth);
      if (pocketbase_auth?.token?.length > 0) {
        state.user = pocketbase_auth.model;
        state.loading = false;
        state.error = null;
        state.loggedIn = true;
      }
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.loggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isRegistered = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout, setUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;
