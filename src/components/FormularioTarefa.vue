<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['salvar-tarefa'])

const textoNovaTarefa = ref('')

function adicionarTarefa() {
  if (textoNovaTarefa.value.trim() !== '') {
    // Emitimos o evento 'salvar-tarefa' e passamos o texto da nova tarefa como payload.
    emit('salvar-tarefa', textoNovaTarefa.value)
    textoNovaTarefa.value = '' // Limpa o campo do input
  }
}
</script>

<template>
  <form @submit.prevent="adicionarTarefa">
    <input type="text" placeholder="Digite a nova tarefa" v-model="textoNovaTarefa" />
    <button type="submit">Adicionar</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  margin-top: 20px;
}
input {
  flex-grow: 1;
  padding: 8px;
}
button {
  padding: 8px;
}
</style>
