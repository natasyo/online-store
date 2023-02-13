<template>
  <div class="filter">
    <p class="h2">Categories</p>
    <div v-for="category in categories" :key="category">
      <SCheckBoxVue
        :id="category"
        :value="category"
        :model-value="valuesFilter.categories"
        @select-value="onSelectCategory"
        name="category"
        :checked="
          valuesFilter.categories &&
          valuesFilter.categories.indexOf(category) >= 0
        "
      />
    </div>
    <SRangeNumber
      :min="valuesFilter.minPrice"
      :max="valuesFilter.maxPrice"
      :min-value="0"
      :max-value="productsController.getMaxPrice()"
      @change-values="changePrice"
    />
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { IFilter, IRange } from "@/types";
import { Ref, ref, defineEmits, defineProps, PropType, onMounted } from "vue";
import { LocationQuery } from "vue-router";
import { productsController } from "../controllers";
import SCheckBoxVue from "./ui/SCheckBox.vue";
import SRangeNumber from "./ui/SRangeNumber.vue";

const categories = productsController.getCategories();
const emit = defineEmits(["onFilterProducts"]);
const props = defineProps({
  filter: { type: Object as PropType<IFilter>, required: true },
});

const valuesFilter: Ref<IFilter> = ref(props.filter);
if (!valuesFilter.value.categories) valuesFilter.value.categories = [];
function onSelectCategory() {
  router
    .push({
      query: valuesFilter.value as unknown as LocationQuery,
    })
    .catch((err) => {
      console.log("err", err);
    });
  emit("onFilterProducts", valuesFilter.value);
}
function changePrice(data: IRange) {
  valuesFilter.value.minPrice = data.min;
  valuesFilter.value.maxPrice = data.max;
  router.push({
    query: valuesFilter.value as unknown as LocationQuery,
  });
  emit("onFilterProducts", valuesFilter.value);
}

onMounted(() => {
  console.log(valuesFilter.value);
});
</script>

<style scoped lang="scss">
.bg_dark {
  .filter {
    background-color: $product-item-bg-dark;
    padding: 15px;
  }
}
</style>
