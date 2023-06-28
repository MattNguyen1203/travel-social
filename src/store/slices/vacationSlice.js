import vacationAPI from "~/api/vacationAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getDetailVacation = createAsyncThunk(
  "vacation/getDetailVacation",
  async (arg, thunkAPI) => {
    try {
      const res = await vacationAPI.getDetailVacation(arg);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log("error:", error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

export const getManyPosts = createAsyncThunk(
  "vacation/getManyPosts",
  async (arg, thunkAPI) => {
    console.log(arg);
    try {
      const res = await vacationAPI.getManyPosts(arg);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log("error:", error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

const vacationSlice = createSlice({
  name: "vacation",
  initialState: {
    detail: {},
    posts: {
      totalPost: null,
      postList: [],
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailVacation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailVacation.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.isLoading = false;
      })
      .addCase(getManyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManyPosts.fulfilled, (state, action) => {
        state.posts = {
          totalPost: action.payload.meta.total,
          postList: action.payload.data,
        };
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = vacationSlice;
export const {} = actions;
export default reducer;
