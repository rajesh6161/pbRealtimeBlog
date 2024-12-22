import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService, { LoginCredentials, RegisterCredentials, User } from './authService';
import { toast } from 'react-toastify';
import { RootState } from '../../store';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: any | null;
  loggedIn: boolean;
  isRegistered: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  loggedIn: false,
  isRegistered: false,
};

// Helper function to handle registration errors
const handleRegistrationError = (errorData: Record<string, any>) => {
  const fields = ['email', 'password', 'passwordConfirm'];
  for (const field of fields) {
    if (errorData[field]) {
      toast.error(errorData[field].message);
      return;
    }
  }
  toast.error('Something went wrong!');
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginCredentials & { isAdmin?: boolean }, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload, !!payload.isAdmin);
      toast.success('Login successful');
      return response;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Login failed';
      toast.error(errorMessage);
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.register(payload);
      toast.success('Registration successful');
      return response;
    } catch (error: any) {
      const errorData = error?.data?.data || {};
      handleRegistrationError(errorData);
      return rejectWithValue({ error: errorData });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (_state) => {
      authService.logout();
      return { ...initialState }; // Reset to initial state
    },
    setUserLoggedIn: (state) => {
      try {
        const pocketbaseAuth = JSON.parse(localStorage.getItem('pocketbase_auth') || '{}');
        if (pocketbaseAuth?.token) {
          state.user = pocketbaseAuth.model;
          state.loading = false;
          state.error = null;
          state.loggedIn = true;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        state.loggedIn = false;
        state.error = 'Invalid auth data';
      }
    },
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
      state.isRegistered = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRegistered = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isRegistered = false;
      });
  }
});

export const { logout, setUserLoggedIn, resetAuthState } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered;

export default authSlice.reducer;
