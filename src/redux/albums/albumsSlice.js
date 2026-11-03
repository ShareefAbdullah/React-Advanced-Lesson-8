import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  isAlbumsLoading: false,
  error: false,
};

export const loadAlbums = createAsyncThunk(
  "albums/load",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Failed to load albums");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAlbums.pending, (state) => {
        state.isAlbumsLoading = true;
        state.error = false;
      })
      .addCase(loadAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.isAlbumsLoading = false;
      })
      .addCase(loadAlbums.rejected, (state) => {
        state.isAlbumsLoading = false;
        state.error = true;
      });
  },
});

export default albumsSlice.reducer;
