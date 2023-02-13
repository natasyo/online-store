<template>
  <div class="products__content">
    <div class="products__thumbnail">
      <img :src="product?.thumbnail" :alt="product?.title" />
    </div>
    <div class="products__rating-price">
      <div class="products__rating">
        <span class="products__rating-number">
          {{ product?.rating }}
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.5 1L8.354 4.94953L12.5 5.58675L9.5 8.65931L10.208 13L6.5 10.9495L2.792 13L3.5 8.65931L0.5 5.58675L4.646 4.94953L6.5 1V1Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      <p class="products__price-wrap">
        <span class="products__price">${{ product?.price }}</span>
        <span class="products__discount"
          >-{{ product?.discountPercentage }}%</span
        >
      </p>
    </div>
    <p class="products__title h3">{{ product?.title }}</p>
    <p class="products__desc">{{ product?.description }}</p>
  </div>
  <div class="products__buttons">
    <button class="btn btn__wishlist">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9205 2.14929C13.2296 1.41343 12.2924 1 11.3151 1C10.3378 1 9.40063 1.41343 8.70976 2.14929L7.99982 2.90512L7.28988 2.14929C5.85098 0.61741 3.51807 0.617411 2.07917 2.14929C0.640276 3.68118 0.640276 6.16485 2.07917 7.69674L2.78911 8.45256L7.99982 14L13.2105 8.45256L13.9205 7.69674C14.6117 6.96122 15 5.96344 15 4.92302C15 3.88259 14.6117 2.88481 13.9205 2.14929Z"
          stroke="#2C2C2C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Wishlist
    </button>
    <button class="btn btn__cart" @click="addInBasket($event, product)">
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.737212"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.66667 1L1 4.6V17.2C1 18.1941 1.79594 19 2.77778 19H15.2222C16.2041 19 17 18.1941 17 17.2V4.6L14.3333 1H3.66667Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          opacity="0.737212"
          d="M1 5.5H17"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          opacity="0.737212"
          d="M13 9C13 10.6569 11.433 12 9.5 12C7.567 12 6 10.6569 6 9"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Add to cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { IProduct } from "../types";
import { useStore } from "vuex";

let store = useStore();

defineProps({ product: { type: Object as PropType<IProduct> } });
function addInBasket(event: Event, product: IProduct | null | undefined) {
  store.commit("addProduct", { product, count: 1 });
}
</script>

<style scoped lang="scss">
.products {
  &__content {
    padding: 15px 15px 0 15px;
  }
  &__price-wrap {
    display: flex;
    justify-content: space-around;
    margin: 0;
  }
  &__thumbnail {
    img {
      width: 100%;
      height: 285px;
      object-fit: contain;
      margin-bottom: 10px;
    }
  }
  &__title {
    text-align: left;
    line-height: 19px;
    margin-top: 15px;
    margin-bottom: 0;
  }
  &__desc {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    margin-top: 0;
    margin-bottom: 15px;
  }
  &__rating-price {
    display: flex;
    justify-content: space-between;
  }
  &__rating {
    height: 30px;
    width: 60px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__price-wrap {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
  }
  &__discount {
    font-size: 16px;
    margin-left: 15px;
  }
  &__buttons {
    display: flex;
    width: 100%;
    height: 45px;
  }
  .btn {
    width: 50%;
  }
}
.bg_dark {
  .products {
    &__title,
    &__desc,
    &__rating-number,
    &__price-wrap {
      color: $font-color-dark;
    }
    &__rating {
      background-color: $product-rating-bg-dark;
    }
    &__discount {
      color: $product-discount-dark;
    }
    .btn {
      &__wishlist {
        background-color: $wishlist-bg-dark;
        color: $wishlist-font-dark;
        path {
          stroke: $wishlist-font-dark;
        }
      }
      &__cart {
        color: $add-cart-font-dark;
        background: $add-cart-bg;
        path {
          stroke: $add-cart-font-dark;
        }
      }
      svg {
        margin-right: 5px;
      }
    }
  }
}
</style>
