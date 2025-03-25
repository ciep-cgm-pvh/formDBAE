<script setup>
import { onMounted, onBeforeUnmount, ref} from "vue";
import autosize from "autosize/dist/autosize";

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
const el = ref()

onMounted(() => autosize(el.value))
  
onBeforeUnmount(() => autosize.destroy(el.value))
</script>

<template>
  <textarea 
  ref="el"
  rows="1"
  class="w-56 enabled:border enabled:border-zinc-950"
  :value="modelValue"
  @input="emit('update:modelValue', $event.target.value)"></textarea>
</template>