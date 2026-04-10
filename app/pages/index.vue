<template>
  <div>
    <section class="bg-white border-b py-12">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <h1 class="text-h2 font-weight-black text-grey-darken-4 mb-4">
              TECNOLOGÍA <br> <span class="text-grey-darken-1">MINIMALISTA</span>
            </h1>
            <p class="text-h6 text-grey-darken-1 mb-8 font-weight-light">
              Hardware seleccionado con un diseño limpio y funcional. 
              Envíos a toda Colombia.
            </p>
            <v-btn size="large" color="primary" elevation="0" rounded="0" class="px-10">
              VER CATÁLOGO
            </v-btn>
          </v-col>

          <v-col cols="12" md="6">
            <v-img 
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800" 
              aspect-ratio="16/9"
              max-height="400"
              cover
              class="grey-lighten-2"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-16">
      <v-container>
        <div class="d-flex align-center mb-10">
          <h2 class="text-h4 font-weight-bold">Destacados</h2>
          <v-divider class="ml-6"></v-divider>
        </div>

        <v-row>
          <v-col v-for="p in products" :key="p.id" cols="12" sm="6" md="3">
            <v-card flat border rounded="0" class="product-card">
              <v-img :src="p.image" height="250" cover class="bg-grey-lighten-4"></v-img>
              <v-card-item class="bg-white">
                <v-card-title class="text-body-1 font-weight-bold">{{ p.name }}</v-card-title>
                <v-card-subtitle class="text-grey-darken-2 font-weight-black">
                  {{ p.price }}
                </v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const products = [
  { id: 1, name: 'Minimalist Keyboard', price: '$120.00', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400' },
  { id: 2, name: 'Grey Mouse Wireless', price: '$80.00', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
  { id: 3, name: 'Studio Headphones', price: '$250.00', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400' },
  { id: 4, name: '4K Display Silver', price: '$450.00', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' }
]
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
}
.product-card:hover {
  border-color: #212121 !important;
  transform: translateY(-5px);
}
</style>