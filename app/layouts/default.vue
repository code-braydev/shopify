<template>
  <v-app style="background-color: #F5F5F5;">
    <v-app-bar flat border color="white" height="70">
      <div class="header-container">
        
        <div class="logo" @click="$router.push('/')">
        <span class="text-grey-darken-1">BZ</span>tore
        </div>

        <div class="search-wrapper">
          <v-text-field
            placeholder="Buscar productos..."
            density="compact"
            variant="solo-filled"
            flat
            bg-color="grey-lighten-4"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="custom-search"
          ></v-text-field>
        </div>

        <div class="actions-wrapper">
          <v-btn icon="mdi-cart-outline" variant="text" size="small"></v-btn>
          <v-btn icon="mdi-account-outline" variant="text" size="small" class="ml-2"></v-btn>
        </div>
        
      </div>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
    <v-footer border class="bg-black">
      <v-container class="d-flex flex-column flex-md-row justify-space-between align-center text-caption text-grey">
          <div>© 2026 BZTORE. Todos los derechos reservados.</div>
          <div class="mt-2 mt-md-0">Montería, Córdoba - Colombia</div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.header-container {
  display: flex !important;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  height: 100%;
}

.logo {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  cursor: pointer;
  flex-shrink: 0; /* Evita que el logo se encoja */
}

.search-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.custom-search {
  max-width: 500px; /* ESTO evita que los iconos se escondan */
  width: 100%;
}

.actions-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0; /* ESTO obliga a los iconos a quedarse en pantalla */
}

/* Forzar que el contenido de Vuetify no meta paddings extra */
:deep(.v-toolbar__content) {
  padding: 0 !important;
  display: block !important;
}
</style>