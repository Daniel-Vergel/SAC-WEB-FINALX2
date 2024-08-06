// selectedStatesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedClientName {
  clientNameState: number | string;
}

const initialState: SelectedClientName = {
  clientNameState: "",
};

export const SelectedClientNameSlice = createSlice({
  name: 'selectedClientName',
  initialState,
  reducers: {
    setSelectedClientName: (state, action: PayloadAction<string | number>) => {
        state.clientNameState = action.payload;
      },
  },
});

export const { setSelectedClientName } = SelectedClientNameSlice.actions;