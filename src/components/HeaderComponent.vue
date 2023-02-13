<template>
  <div class="header">
    <a class="logo header__logo">
      <img src="../assets/images/logo.png" alt="" />
      <span class="logo__text"> Vuesax </span>
    </a>
    <div class="header__cart cart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
      <span class="cart__count">{{ store.getters.getCount }}</span>
      <CartComponent class="cart__component" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import CartComponent from "./CartComponent.vue";
let store = useStore();
console.log(store);
// let productsInCart: Ref<number> = ref(store.state.products.length);
</script>

<style scoped lang="scss">
.header {
  .cart {
    position: relative;
    svg {
      height: 30px;
    }
    &__count {
      color: $add-cart-font-dark;
    }
    &__component {
      position: absolute;
      right: 0;
      z-index: 5;
    }
  }
  .logo {
    &__text {
      font-family: $font-family;
      font-size: 22px;
      line-height: 27px;
      font-weight: 800;
    }
  }
}

.bg_dark {
  .header {
    background-color: $product-item-bg-dark;
    border-radius: $border-radius;
    margin: 0 0 15px;
    padding: $padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      &__text {
        color: $font-logo-color-dark;
      }
    }
    .cart {
      fill: $font-logo-color-dark;
    }
  }
}
</style>
