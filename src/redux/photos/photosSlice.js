import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
  searchFilter: "",
  isPhotosLoading: false,
  error: false,
};

export const loadPhotos = createAsyncThunk(
  "photos/load",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/?albumId=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to load photos.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhotos.pending, (state) => {
        state.isPhotosLoading = true;
        state.error = false;
      })
      .addCase(loadPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.error = false;
        state.isPhotosLoading = false;
      })
      .addCase(loadPhotos.rejected, (state) => {
        state.isPhotosLoading = false;
        state.error = true;
      });
  },
});

export const { setSearchFilter } = photosSlice.actions;

export default photosSlice.reducer;
