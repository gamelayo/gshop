import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      let temProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = temProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let temProducts = [];
      if (sort === "latest") {
        temProducts = products;
      } else if (sort === "lowest-price") {
        temProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sort === "highest-price") {
        temProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      } else if (sort === "a-z") {
        temProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sort === "z-a") {
        temProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = temProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let temProducts = [];

      if (category === "All") {
        temProducts = products;
      } else {
        temProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = temProducts;
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let temProducts = [];

      if (brand === "All") {
        temProducts = products;
      } else {
        temProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = temProducts;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let temProducts = [];
      temProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = temProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
