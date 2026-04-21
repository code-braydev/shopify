<template>
  <v-app style="background-color: #f5f5f5">
    <Header />
    <Navbar />

    <v-main>
      <slot />
    </v-main>

    <ShoppingCart />
    <User />
    <Footer />

  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useShopStore } from '@/store/shop'

const store = useShopStore()

onMounted(() => {
  store.hydrate()
})
</script>