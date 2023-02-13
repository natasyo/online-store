import { createStore } from "vuex";
import { cart } from "./cartStore";
import { wishlist } from "./wishlistStore";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    wishlist,
  },
});
