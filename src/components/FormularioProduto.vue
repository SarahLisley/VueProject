<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Produto } from '../types/Produto'

const emit = defineEmits(['salvar-produto'])
const props = defineProps<{ produto: Produto | null }>()

const produtoForm = ref<Produto>({
  id: 0,
  nome: '',
  preco: 0,
  descricao: '',
})

watch(
  () => props.produto,
  (novo) => {
    if (novo) produtoForm.value = { ...novo }
    else produtoForm.value = { id: 0, nome: '', preco: 0, descricao: '' }
  },
  { immediate: true },
)

const nomeErro = computed(() => !produtoForm.value.nome)
const precoErro = computed(() => produtoForm.value.preco <= 0)

function salvar() {
  if (!nomeErro.value && !precoErro.value) {
    emit('salvar-produto', { ...produtoForm.value })
    produtoForm.value = { id: 0, nome: '', preco: 0, descricao: '' }
  }
}
</script>

<template>
  <v-form>
    <v-text-field
      label="Nome"
      v-model="produtoForm.nome"
      :error="nomeErro"
      :error-messages="nomeErro ? 'Nome obrigatório' : ''"
      required
    />
    <v-text-field
      label="Preço"
      v-model.number="produtoForm.preco"
      type="number"
      :error="precoErro"
      :error-messages="precoErro ? 'Preço deve ser positivo' : ''"
      required
      min="0.01"
      step="0.01"
    />
    <v-textarea label="Descrição" v-model="produtoForm.descricao" rows="2" />
    <v-btn color="primary" @click="salvar" class="mt-4"> Adicionar Produto </v-btn>
  </v-form>
</template>
