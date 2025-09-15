import { ref } from 'vue'
import type { Produto } from '../types/Produto'

const apiUrl = '/api/produtos'
export const produtos = ref<Produto[]>([])

export async function carregarProdutos() {
  const res = await fetch(apiUrl)
  produtos.value = await res.json()
}

export async function criarProduto(p: Partial<Produto>) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  })
  return res.json()
}
