import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: [] };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [action.payload, ...state.expenses];
    },
    renewExpense(state) {
        state.expenses = [];
    },
    editExpense(state, action) {
      for (let i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i].key === action.payload.key) {
          state.expenses[i] = action.payload;
          break
        }
      }
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
