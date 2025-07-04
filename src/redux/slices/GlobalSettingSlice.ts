import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalSettingState {
  language: string;
}

const initialState: GlobalSettingState = {
  language: "vi",
};

const globalSettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = globalSettingSlice.actions;
export default globalSettingSlice.reducer;
