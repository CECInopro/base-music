// src/redux/slices/UserSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
  accessToken: string | null;
  userInfo: any;
}

const initialState: UserState = {
  accessToken: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<{accessToken: string; userInfo: any}>) {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
    },
    logout(state) {
      state.accessToken = null;
      state.userInfo = null;
    },
  },
});

export const {updateUserInfo, logout} = userSlice.actions;
export default userSlice.reducer;
