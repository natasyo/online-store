<template>
  <input
    type="checkbox"
    :id="id"
    class="check-box"
    :value="value"
    @change="changeValue"
    :name="name"
    :checked="checked"
  />
  <label :for="id" class="check-box-label">{{ value }}</label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, Ref, ref } from "vue";
const props = defineProps({
  id: { type: String, required: true },
  value: { type: String, required: true },
  modelValue: { type: Array as PropType<Array<string>>, required: true },
  name: { type: String, required: true },
  checked: Boolean,
});

const emit = defineEmits(["selectValue"]);
let list: Ref<Array<string>> = ref(props.modelValue);
function changeValue(e: Event) {
  console.log(list.value, e.target as HTMLInputElement);
  if (
    (e.target as HTMLInputElement).checked &&
    list.value.indexOf((e.target as HTMLInputElement).value) < 0
  ) {
    list.value.push((e.target as HTMLInputElement).value);
  } else if (
    !(e.target as HTMLInputElement).checked &&
    list.value.indexOf((e.target as HTMLInputElement).value) >= 0
  ) {
    list.value.splice(
      list.value.indexOf((e.target as HTMLInputElement).value),
      1
    );
  }
  emit("selectValue");
}
</script>

<style scoped lang="scss">
.check-box {
  display: none;
}
.check-box-label {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: block;
    border: 1px solid #fff;
    height: 17px;
    width: 17px;
    margin-right: 10px;
    border-radius: 3px;
    box-sizing: border-box;
  }
}
.check-box:checked + .check-box-label {
  &::before {
    content: url(../../assets/images/ok.png);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 6px;
    padding-bottom: 3px;
  }
}
</style>
