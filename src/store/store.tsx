import { configureStore } from "@reduxjs/toolkit";

import { ValueSlice } from "./inputValue/valueState";
import { ValueRowsSlice } from "./inputValueRows/inputValueRowsState";
import { SortingSlice } from "./sortingState/sortingState";
import { PaginationSlice } from "./paginationSate/paginationState";
import { AsuntoSlice } from "./asuntoExpandedState.tsx/asuntoState";
import { SlidebarSlice } from "./slidebarState/slidebarState";
import { InputMonthsSlice } from "./inputMonths/inputMonthsState";
import { SelectedStatesSlice } from "./grillaState.tsx/SelectedStates";
import { SelectedClientNameSlice } from "./grillaState.tsx/SelectedClientName";
import { SelectedDescriptionSlice } from "./grillaState.tsx/SelectedDescription";
import { SelectedBitTicketSlice } from "./grillaState.tsx/SelectedBitTicket";


export const store = configureStore({
  reducer: {
    valueState: ValueSlice.reducer,
    inputValueRows: ValueRowsSlice.reducer,
    sortingState: SortingSlice.reducer,
    PaginationState: PaginationSlice.reducer,
    asuntoState: AsuntoSlice.reducer,
    slidebarState: SlidebarSlice.reducer,
    inputMonthsState: InputMonthsSlice.reducer,
    selectedStates: SelectedStatesSlice.reducer,
    selectedClientName: SelectedClientNameSlice.reducer,
    selectedDescription: SelectedDescriptionSlice.reducer,
    bitTicketState: SelectedBitTicketSlice.reducer,

  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
