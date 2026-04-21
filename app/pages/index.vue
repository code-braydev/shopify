<template>
  <div>
    <section class="bg-white border-b py-12">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <h1 class="text-h2 font-weight-black text-grey-darken-4 mb-4">
              TU TIENDA <br> <span class="text-grey-darken-1">TECH REAL</span>
            </h1>
            <p class="text-h6 text-grey-darken-1 mb-8 font-weight-light">
              Compra tecnología de alto rendimiento con filtros rápidos, carrito inteligente
              y checkout simulado de extremo a extremo.
            </p>
            <v-btn size="large" color="primary" elevation="0" rounded="0" class="px-10 text-none"
              @click="scrollToProducts">
              Ver catálogo
            </v-btn>
          </v-col>

          <v-col cols="12" md="6">
            <v-img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800" aspect-ratio="16/9"
              max-height="400" cover class="grey-lighten-2"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-16">
      <v-container id="products-section">
        <div class="d-flex align-center mb-10">
          <h2 class="text-h4 font-weight-bold">Productos</h2>
          <v-divider class="ml-6"></v-divider>
        </div>

        <div class="d-flex justify-space-between align-center mb-6">
          <span class="text-body-2 text-grey-darken-1">
            {{ store.filteredProducts.length }} resultados
          </span>
          <v-btn variant="text" class="text-none" @click="store.openCart()">
            Ver carrito<span v-if="store.cartCount > 0"> ({{ store.cartCount }})</span>
          </v-btn>
        </div>

        <v-row>
          <v-col v-for="p in store.filteredProducts" :key="p.id" cols="12" sm="6" md="4" lg="3">
            <Card :product="p" />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { useShopStore } from '~/store/shop'

const store = useShopStore()

const scrollToProducts = () => {
  const section = document.getElementById('products-section')
  if (!section) return
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #e8e8e8;
}
</style>