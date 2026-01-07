import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsService } from '@/services/products.service';
import { Product } from '@/models/products';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
};

// Thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const data = await ProductsService.getProductsByCategory(category);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    // Fetch products by category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total || action.payload.products.length;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;

