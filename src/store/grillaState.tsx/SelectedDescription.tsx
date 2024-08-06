// selectedStatesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedDescription {
    clientDescriptionState: string | number | string;
}

const initialState: SelectedDescription = {
  clientDescriptionState: '',
};

export const SelectedDescriptionSlice = createSlice({
  name: 'selectedDescription',
  initialState,
  reducers: {
    setSelectedDescription: (state, action: PayloadAction<string | number>) => {
        state.clientDescriptionState = action.payload;
      },
  },
});

export const { setSelectedDescription } = SelectedDescriptionSlice.actions;