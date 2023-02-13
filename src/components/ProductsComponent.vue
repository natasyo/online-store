<template>
  <div class="products">
    <FilterComponent
      :products="products"
      @on-filter-products="filterProducts"
      :filter="filter"
    />
    <div class="products__wrap">
      <div v-for="product in products" :key="product.id" class="products__item">
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import ProductItem from "./ProductsItem.vue";
import FilterComponent from "./FilterComponent.vue";
import { IFilter, IProduct } from "@/types";
import router from "@/router";
import { productsController } from "@/controllers";

let filter: IFilter = JSON.parse(
  JSON.stringify(router.currentRoute.value.query)
) as IFilter;
if (!Array.isArray(filter.categories) && filter.categories) {
  filter.categories = [filter.categories];
}
filter.maxPrice = !filter.maxPrice
  ? productsController.getMaxPrice()
  : filter.maxPrice;
filter.minPrice = !filter.minPrice ? 0 : filter.minPrice;
const products: Ref<IProduct[]> = ref(productsController.getProducts(filter));

function filterProducts(filterData: IFilter) {
  products.value = productsController.getProducts(filterData);
}
</script>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
  &__wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
  }
  &__item {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    transition: 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19) all;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      transition: 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19) all;
    }
  }
}
.bg_dark {
  .products {
    &__item {
      background-color: $product-item-bg-dark;
      &:hover {
        @include hover-shadow;
      }
    }
  }
}
</style>
