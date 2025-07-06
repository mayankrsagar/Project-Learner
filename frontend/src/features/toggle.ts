// store/slices/toggleSlice.ts
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

interface ToggleState {
  darkMode: boolean;
  mobileMenuOpen: boolean;
}

const initialState: ToggleState = {
  darkMode: false,
  mobileMenuOpen: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleMobileMenu,
  setMobileMenuOpen,
} = toggleSlice.actions;

export default toggleSlice.reducer;
