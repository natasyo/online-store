<template>
  <div class="cart-content">
    <div class="cart-content__items" v-if="products.length > 0">
      <div
        class="cart-content__item"
        v-for="productItem in products"
        :key="productItem.product.id"
      >
        <div class="cart-content__image cart-content__cell">
          <img :src="productItem.product.thumbnail" alt="" />
        </div>
        <div class="cart-content__info cart-content__cell">
          <p class="cart-content__name">{{ productItem.product.title }}</p>
        </div>
        <div class="cart-content__count-info cart-content__cell">
          <p class="cart-content__count">Count: {{ productItem.count }}</p>
          <p class="cart-content__price">
            Price {{ productItem.count * productItem.product.price }}
          </p>
        </div>
        <div class="cart-content__remove cart-content__cell">
          <button
            class="cart-content__button"
            @click="removeProduct($event, productItem)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="cart-content__total">
        <p>Total: {{ store.getters.getTotal }}</p>
      </div>
    </div>
    <div class="cart-content__empty" v-else>
      <p>Cart is empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICartProduct, ICartProducts } from "../types";
import { ref, Ref } from "vue";
import { Store, useStore } from "vuex";
let store: Store<ICartProducts> = useStore();
let products: Ref<ICartProduct[]> = ref(store.getters.getProductsInCart);
function removeProduct(event: Event, productItem: ICartProduct) {
  store.commit("removeProduct", productItem.product.id);
}
</script>

<style scoped lang="scss">
.cart-content {
  padding: $padding;
  border-radius: $border-radius;
  width: 400px;
  @include hover-shadow;
  &__item {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 0.2fr;
  }
  &__info {
    flex-grow: 1;
  }
  &__cell {
    padding: 10px;
  }
  &__image {
    width: 100px;
    min-width: 100px;
    img {
      max-width: 100%;
      height: 80px;
      object-fit: cover;
      width: 100%;
    }
    box-sizing: border-box;
  }
  p {
    margin: 0;
    text-align: left;
    font-size: 15px;
  }
  &__button {
    border: 0;
    padding: 0;
    background-color: transparent;
    svg {
      height: 15px;
    }
  }
}
.bg_dark {
  .cart-content {
    background-color: $product-item-bg-dark;
    color: $add-cart-font-dark;
    &__button {
      svg {
        fill: $add-cart-font-dark;
      }
    }
  }
}
</style>
