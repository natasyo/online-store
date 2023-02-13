import { Module } from "vuex";
import { IProduct } from "@/types";

export const wishlist: Module<{ products: IProduct[] }, any> = {
  state: () => ({ products: [] }),
  mutations: {
    addRemoveInWishlist(state, product: IProduct) {
      const itemIndex = state.products.findIndex(
        (productItem) => productItem.id === product.id
      );
      if (itemIndex < 0) {
        state.products.push(product);
      } else {
        state.products.splice(itemIndex);
      }
    },
  },
};
