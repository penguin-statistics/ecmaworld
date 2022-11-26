import { SiteLanguages, SiteServers } from "@exusiai-dev/rest/v3/i18n";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PreferenceState {
  server: SiteServers;
  language: SiteLanguages;
}

const initialState: PreferenceState = {
  server: "CN" as SiteServers,
  language: "zh" as SiteLanguages,
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    changeServer: (state, action: PayloadAction<SiteServers>) => {
      state.server = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<SiteLanguages>) => {
      state.language = action.payload;
    },
  },
});

export const { changeServer, changeLanguage } = preferenceSlice.actions;

export const preferenceReducer = preferenceSlice.reducer;
