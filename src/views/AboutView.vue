<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const { productName } = storeToRefs(productStore)

productStore.getProduct()
</script>

<template>
  <main>
    this page use store(pinia) action call
    {{ productName }}
  </main>
</template>
