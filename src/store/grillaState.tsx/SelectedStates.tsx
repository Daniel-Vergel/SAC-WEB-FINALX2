// selectedStatesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedStatesState {
  value: string[];
}

const initialState: SelectedStatesState = {
  value: ['EN.EJECUCION'],
};

export const SelectedStatesSlice = createSlice({
  name: 'selectedStates',
  initialState,
  reducers: {
    toggleState: (state, action: PayloadAction<string>) => {
      const index = state.value.indexOf(action.payload);
      if (index === -1) {
        state.value.push(action.payload);
      } else {
        state.value.splice(index, 1);
      }
    },
  },
});

export const { toggleState } = SelectedStatesSlice.actions;