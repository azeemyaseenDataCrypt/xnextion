import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data);

    return data;
  }
);

{/**

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    // const response = await fetch("https://dummyjson.com/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: email,
    //     password: password,
    //     // expiresInMins: 60, // optional
    //   }),
    // });

    // return response.json;
    // .then(res => res.json())
    // .then(console.log);

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        return response;
      })
      .then((err) => {
        return err;
      });
  }
);

 */}

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    // debugger;
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete request failed");
      }

      const data = await response.json();
      console.log(data);
      return data;

      // return productId;
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  }
);

interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

interface ProductsState {
  data: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProducts.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(deleteProduct.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state: ProductsState, action: any) => {
        state.status = "succeeded";
        state.data = Array.isArray(state.data)
          ? state.data.filter(
              (product: Product) => product.id !== action.payload.id
            )
          : [];
      })

      .addCase(deleteProduct.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export const productsState = (state: any) => state.products;

export const getProducts = (state: ProductsState) => state;

export default productsSlice.reducer;
