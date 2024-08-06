import { createSlice } from "@reduxjs/toolkit";

export const PaginationSlice = createSlice({
  name: "paginationState",
  initialState: {
    currentPage: 1,
  },

  reducers: {
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },

    nextPageX10: (state) => {
      state.currentPage = state.currentPage + 10;
    },

    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage = state.currentPage - 1;
      }
    },

    prevPagex10: (state) => {
      if (state.currentPage > 10) {
        state.currentPage = state.currentPage - 10;
      }
    },

    setCurrentPage: (state) => {
      state.currentPage = state.currentPage = 1
    }
  },
});

export const { nextPage, prevPage, nextPageX10, prevPagex10, setCurrentPage} =
  PaginationSlice.actions;
