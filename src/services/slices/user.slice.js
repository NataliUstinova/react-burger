import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  name: "",
  email: "",
  password: "",
  token: "",
  refreshToken: "",
  preLoginLocation: "/",
  isAuth: false,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const response = await api.login(email, password);
    return response.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setPreLoginLocation: (state, action) => {
      state.preLoginLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setUserName,
  setUserEmail,
  setUserIsAuth,
  setUserPassword,
  setUserToken,
  setUserRefreshToken,
  setPreLoginLocation,
} = userSlice.actions;

export default userSlice.reducer;
