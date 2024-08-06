// selectedStatesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedBitTicket {
    bitTicketState: string | number ;
}

const initialState: SelectedBitTicket = {
  bitTicketState: '',
};

export const SelectedBitTicketSlice = createSlice({
  name: 'bitTicketState',
  initialState,
  reducers: {
    setSelectedBitTicket: (state, action: PayloadAction<string | number>) => {
        state.bitTicketState = action.payload;
      },
  },
});

export const { setSelectedBitTicket } = SelectedBitTicketSlice.actions;