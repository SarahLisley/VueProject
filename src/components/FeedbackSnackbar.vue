<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  message: string
  color?: string
}>()

const visible = ref(props.show)

watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
)

function updateShow(val: boolean) {
  visible.value = val
  emit('update:show', val)
}

const emit = defineEmits(['update:show'])
</script>

<template>
  <v-snackbar
    v-model="visible"
    :color="color || 'success'"
    timeout="3000"
    @update:model-value="updateShow"
  >
    {{ message }}
  </v-snackbar>
</template>
