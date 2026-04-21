<template>
  <v-sheet class="filter-shell" color="white">
    <v-container class="py-2 py-md-3 d-flex flex-column flex-md-row align-md-center ga-3 ga-md-4">
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-chip v-for="item in store.categories" :key="item"
          :color="store.filters.category === item ? 'primary' : undefined"
          :variant="store.filters.category === item ? 'flat' : 'outlined'" class="text-none"
          @click="store.setCategory(item)">
          {{ item }}
        </v-chip>
      </div>

      <v-spacer />

      <v-select label="Ordenar" :model-value="store.filters.sort" @update:model-value="onSortChange" :items="sortItems"
        item-title="label" item-value="value" density="compact" variant="outlined" hide-details class="sort-select" />
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { useShopStore } from '~/store/shop'
import type { SortOption } from '~/types/shop'

const store = useShopStore()

const sortItems: { label: string; value: SortOption }[] = [
  { label: 'Destacados', value: 'destacados' },
  { label: 'Mayor rating', value: 'rating' },
  { label: 'Precio: menor a mayor', value: 'precio_asc' },
  { label: 'Precio: mayor a menor', value: 'precio_desc' },
]

const onSortChange = (value: SortOption | null) => {
  if (!value) return
  store.setSort(value)
}
</script>

<style scoped>
.filter-shell {
  border-bottom: 1px solid #ececec;
}

.sort-select {
  max-width: 280px;
}
</style>