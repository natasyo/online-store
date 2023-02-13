<template>
  <div class="range__values">
    <input
      type="number"
      class="range__value"
      :value="min"
      :min="minValue"
    /><span class="range__t"> — </span>
    <input type="number" class="range__value" :value="max" :max="maxValue" />
  </div>
  <div class="range" ref="range">
    <div
      class="range__pointer range__pointer-min"
      ref="rangeMin"
      data-type="min"
      @mousedown="mouseDown($event)"
    ></div>
    <div
      class="range__pointer range__pointer-max"
      ref="rangeMax"
      data-type="max"
      @mousedown="mouseDown($event)"
    ></div>
    <div class="range__path"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, Ref, onMounted, defineEmits } from "vue";
const props = defineProps({
  min: { type: Number },
  max: { type: Number },
  minValue: { type: Number, required: true },
  maxValue: { type: Number, required: true },
});

const emmit = defineEmits(["changeValues"]);

const range = ref();
const rangeMin = ref();
const rangeMax = ref();
const min: Ref<number> = ref(props.min || props.minValue);
const max: Ref<number> = ref(props.max || props.maxValue);
let step = 0;
function mouseDown(e: MouseEvent) {
  moveAt(e);
  let point = e.target as HTMLElement;
  point.addEventListener("mousemove", moveAt);
  point.addEventListener("mouseup", () => {
    point.removeEventListener("mousemove", moveAt);
    console.log("--------remove");
    emmit("changeValues", { min: min.value, max: max.value });
  });
  point.addEventListener("mouseout", () => {
    point.removeEventListener("mousemove", moveAt);
  });
}

function moveAt(e: MouseEvent) {
  let point = e.target as HTMLElement;
  const type = point.dataset.type;
  console.log(e.type);
  let pointLeft = Number(point.style.left.replace("px", ""));
  let newPoint = pointLeft + e.offsetX - 7;
  if (type === "min") {
    console.log("min", newPoint);
    if (newPoint > max.value / step) newPoint = max.value;
    if (newPoint < 0) newPoint = 0;
    min.value = Math.round(newPoint / step);
    min.value = Math.round(newPoint * step);
  }
  if (type === "max") {
    console.log("max", newPoint);
    if (newPoint < min.value * step) newPoint = min.value;
    if (Math.round(newPoint * step) > props.maxValue)
      newPoint = Math.round(props.maxValue / step);
    max.value = Math.round(newPoint * step);
    max.value = Math.round(newPoint * step);
  }
  point.style.left = `${newPoint}px`;
}
onMounted(() => {
  step = (props.maxValue - props.minValue) / range.value.offsetWidth;
  console.log(step);
  rangeMin.value.style.left = `${(props.min || props.minValue) / step - 7}px`;
  rangeMax.value.style.left = `${(props.max || props.maxValue) / step - 7}px`;
});
</script>

<style scoped lang="scss">
.range {
  position: relative;
  top: 10px;
  &__values {
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
  }
  &__t {
    margin: 0 10px;
  }
  &__value {
    width: 80px;
    padding: 5px 10px;
    font-size: 18px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid;
  }
  &__path {
    height: 6px;
    border-radius: 3px;
    width: 100%;
  }
  &__pointer {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: -7px;
  }
}
.bg_dark {
  .range {
    &__pointer {
      background-color: #6f64f8;
    }
    &__path {
      background-color: #6f64f8;
    }
    &__values {
      color: $add-cart-font-dark;
    }
    &__value {
      background-color: transparent;
      color: $add-cart-font-dark;
    }
  }
}
</style>
