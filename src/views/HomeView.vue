<script setup lang="ts">
import { getProduct } from '@/services/webApi'
import { useApi } from '@/composables/useApi'

const { data } = await useApi(() => getProduct({ id: '234' }))
</script>

<template>
  <main>
    this page use top level api call
    {{ data?.productName }}
  </main>
</template>
