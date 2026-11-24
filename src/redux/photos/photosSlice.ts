import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PhotosType = {
  albumId: number;
  id: number;
  title: string;
};

export type InitialStateType = {
  photos: PhotosType[];
  searchFilter: string;
  isPhotosLoading: boolean;
  error: boolean;
};

const initialState: InitialStateType = {
  photos: [],
  searchFilter: "",
  isPhotosLoading: false,
  error: false,
};

export const loadPhotos = createAsyncThunk<
  PhotosType[],
  string,
  { rejectValue: string }
>("photos/load", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/?albumId=${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to load photos.");
    }
    const data: PhotosType[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong");
  }
});

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
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
