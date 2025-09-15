<!-- eslint-disable vue/valid-v-slot -->
<script setup lang="ts">
import { ref } from 'vue'
import type { Produto } from './types/Produto'
import FormularioProduto from './components/FormularioProduto.vue'
import FeedbackSnackbar from './components/FeedbackSnackbar.vue'

const produtos = ref<Produto[]>([
  { id: 1, nome: 'Notebook', preco: 3500, descricao: 'Dell Inspiron' },
  { id: 2, nome: 'Mouse', preco: 80, descricao: 'Logitech sem fio' },
])

const produtoEditando = ref<Produto | null>(null)
const snackbar = ref({ show: false, message: '', color: 'success' })

function adicionarProduto(produto: Produto) {
  if (produtoEditando.value) {
    const idx = produtos.value.findIndex((p) => p.id === produtoEditando.value?.id)
    if (idx !== -1) {
      produtos.value[idx] = { ...produto, id: produtoEditando.value.id }
      mostrarSnackbar('Produto editado com sucesso!', 'success')
    }
    produtoEditando.value = null // Limpa o formulário após a edição
  } else {
    produto.id = produtos.value.length ? Math.max(...produtos.value.map((p) => p.id)) + 1 : 1
    produtos.value.push(produto)
    mostrarSnackbar('Produto adicionado com sucesso!', 'success')
  }
}

function editarProduto(produto: Produto) {
  produtoEditando.value = { ...produto }
}

function excluirProduto(produto: Produto) {
  produtos.value = produtos.value.filter((p) => p.id !== produto.id)
  mostrarSnackbar('Produto excluído com sucesso!', 'success')
}

function mostrarSnackbar(message: string, color: string) {
  snackbar.value = { show: true, message, color }
}

// Nova função para limpar o formulário e preparar para um novo produto
function prepararParaNovoProduto() {
  produtoEditando.value = null
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mx-auto my-8" max-width="600" elevation="4">
          <v-card-title>
            <v-icon color="primary" class="mr-2">mdi-cart</v-icon>
            <span class="text-h5 font-weight-bold">Cadastro de Produtos</span>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <FormularioProduto :produto="produtoEditando" @salvar-produto="adicionarProduto" />
            <!-- Botão para adicionar novo produto, visível apenas se estiver editando -->
            <v-btn
              v-if="produtoEditando"
              color="info"
              variant="outlined"
              class="mt-4"
              @click="prepararParaNovoProduto"
            >
              <v-icon start>mdi-plus</v-icon> Adicionar Novo
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mx-auto mb-8" max-width="900" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-table</v-icon>
            <span class="text-h6 font-weight-bold">Produtos Cadastrados</span>
            <v-spacer></v-spacer>
            <!-- Botão para adicionar novo produto na seção da tabela, se não estiver editando -->
            <v-btn
              v-if="!produtoEditando"
              color="success"
              variant="flat"
              class="ml-auto"
              @click="prepararParaNovoProduto"
            >
              <v-icon start>mdi-plus</v-icon> Novo Produto
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-data-table
              :headers="[
                { title: 'Nome', value: 'nome' },
                { title: 'Preço', value: 'preco' },
                { title: 'Descrição', value: 'descricao' },
                { title: 'Ações', value: 'acoes', sortable: false, align: 'center' }, // <-- Adicionado novamente!
              ]"
              :items="produtos"
              :items-per-page="5"
              class="mt-2"
              density="comfortable"
              hover
              :footer-props="{ 'items-per-page-options': [5, 10, 20] }"
            >
              <template #item.preco="{ item }">
                <span>R$ {{ item.preco.toFixed(2) }}</span>
              </template>
              <!-- Slot de ações adicionado novamente! -->
              <template #item.acoes="{ item }">
                <v-btn
                  icon
                  @click="editarProduto(item)"
                  color="primary"
                  size="small"
                  variant="text"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="excluirProduto(item)" color="error" size="small" variant="text">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <!-- Mensagem para quando não houver itens -->
              <template v-slot:no-data>
                <v-alert :value="true" color="info" icon="mdi-information">
                  Nenhum produto cadastrado ainda. Comece adicionando um!
                </v-alert>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>

        <FeedbackSnackbar
          :show="snackbar.show"
          :message="snackbar.message"
          :color="snackbar.color"
          @update:show="snackbar.show = $event"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>
