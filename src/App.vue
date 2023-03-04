<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    header
    <RouterLink :to="{ name: 'home' }"> home </RouterLink>
    <RouterLink :to="{ name: 'about' }"> about </RouterLink>
  </header>

  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>

<style>
#app {
  font-size: 0.16rem;
}
</style>
