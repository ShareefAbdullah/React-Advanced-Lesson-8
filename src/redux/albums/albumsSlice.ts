import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AlbumsType = {
  userId: number;
  id: number;
  title: string;
};

export type InitialStateType = {
  albums: AlbumsType[];
  isAlbumsLoading: boolean;
  error: boolean;
};

const initialState: InitialStateType = {
  albums: [],
  isAlbumsLoading: false,
  error: false,
};

export const loadAlbums = createAsyncThunk<
  AlbumsType[],
  void,
  { rejectValue: string }
>("albums/load", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums?_limit=10"
    );
    if (!response.ok) {
      throw new Error("Failed to load albums");
    }
    const data: AlbumsType[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong");
  }
});

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
