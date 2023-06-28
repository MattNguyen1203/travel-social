import authAPI from "~/api/authAPI";
import { LoginData } from "~/modules/auth/components/config/data";
import { LOGIN } from "~/utils/constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const handleAuth = createAsyncThunk(
  "auth/handleAuth",
  async (arg, thunkAPI) => {
    try {
      let res = await authAPI[arg.type](arg.data);
      console.log(res);
      return {
        result: res.data,
        type: arg.type,
        status: res.status,
        message: res.data.message,
      };
    } catch (error) {
      console.log(error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

export const getInfoUser = createAsyncThunk(
  "auth/getInfoUser",
  async (arg, thunkAPI) => {
    try {
      const res = await authAPI.getInfoUser(arg);
      // console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      // console.log(error);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    info: [],
    renderList: [{ list: LoginData }],
    isLogin: !!localStorage.getItem("token"),
    isLoading: false,
    status: null,
    messageResult: "",
  },
  reducers: {
    changeRenderList: (state, action) => {
      if (action.payload.type === "ADD") {
        state.renderList.push(action.payload.data);
      } else if (action.payload.type === "BACK") {
        const newList = state.renderList.slice(0, state.renderList.length - 1);
        return {
          ...state,
          renderList: newList,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.messageResult = action.payload.message;
        if (action.payload && action.payload.type === LOGIN) {
          state.isLogin = true;
          localStorage.setItem(
            "token",
            `Bearer ${action.payload.result.data.accessToken}`
          );
        }
      })
      .addCase(getInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.info = action.payload;
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = authSlice;
export const { changeRenderList } = actions;
export default reducer;
