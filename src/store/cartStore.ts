import { Module } from "vuex";
import { ICartProduct, ICartProducts, IProduct } from "@/types";

export const cart: Module<ICartProducts, any> = {
  state: () => ({ products: [] }),
  mutations: {
    addProduct(
      state: ICartProducts,
      data: { product: IProduct; count: number }
    ) {
      const findProductIndex = state.products.findIndex(
        (el) => el.product.id === data.product.id
      );
      if (findProductIndex < 0) {
        state.products.push(data);
      } else {
        state.products[findProductIndex].count += data.count;
      }
    },
    removeProduct(state: ICartProducts, productId: number) {
      const index = state.products.findIndex(
        (el) => el.product.id === productId
      );
      console.log(index);
      state.products.splice(index, 1);
      console.log(state.products);
    },
  },
  getters: {
    getCount(state) {
      return state.products.length;
    },
    getProductsInCart(state): ICartProduct[] {
      return state.products;
    },
    getTotal(state): number {
      return state.products.reduce((total, product) => {
        return total + product.product.price * product.count;
      }, 0);
    },
  },
};
