import notiAPI from "~/api/notiAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("notification/getList", async (arg, thunkAPI) => {
  try {
    const res = await notiAPI.getList();
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
  }
});

export const updateOne = createAsyncThunk("notification/updateOne", async (id, thunkAPI) => {
  try {
    const res = await notiAPI.updateStatusOne(id);
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
  }
});

export const updateAll = createAsyncThunk("notification/updateAll", async (id, thunkAPI) => {
  try {
    const res = await notiAPI.updateStatusAll();
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
  }
});

const notiSlice = createSlice({
  name: "notification",
  initialState: {
    isVisible: false,
    quantity: 0,
    list: [],
    isLoading: true,
  },
  reducers: {
    changeVisible: (state, action) => {
      state.isVisible = action.payload === undefined ? !state.isVisible : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload;
          state.quantity = action.payload.filter((item) => item.isSeen === false).length;
          state.isLoading = false;
        }
      })
      .addCase(updateOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAll.fulfilled, (state, action) => {
        state.list = state.list.map((item) => Object.assign(item, { isSeen: true }));
        state.quantity = 0;
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = notiSlice;
export const { changeVisible } = actions;
export default reducer;
