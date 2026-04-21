<template>
	<v-card border flat class="product-card h-100 d-flex flex-column">
		<v-img :src="props.product.image" height="220" cover class="bg-grey-lighten-4" />

		<v-card-text class="pb-1">
			<div class="text-caption text-grey-darken-1 mb-2">{{ props.product.category }} · {{ props.product.brand }}
			</div>
			<div class="text-body-1 font-weight-bold mb-1">{{ props.product.name }}</div>
			<div class="d-flex align-center ga-2 mb-1">
				<v-rating :model-value="props.product.rating" color="amber" density="compact" half-increments readonly
					size="small" />
				<span class="text-caption text-grey-darken-1">{{ props.product.rating }} ({{ props.product.ratingCount
				}})</span>
			</div>

			<div class="d-flex align-center ga-2 mb-2">
				<v-rating :model-value="userRating" @update:model-value="onRateChange" color="amber" density="compact"
					half-increments size="x-small" :readonly="!store.isAuthenticated" />
				<v-btn v-if="store.isAuthenticated" variant="text" size="x-small" class="text-none px-1"
					@click="submitRating">
					Calificar
				</v-btn>
				<v-btn v-else variant="text" size="x-small" class="text-none px-1" @click="store.openLogin()">
					Inicia sesion para calificar
				</v-btn>
			</div>

			<div class="text-subtitle-1 font-weight-black">{{ store.formatPrice(props.product.price) }}</div>
		</v-card-text>

		<v-spacer />

		<v-card-actions>
			<v-btn block color="primary" class="text-none" prepend-icon="mdi-cart-plus" @click="onAddToCart">
				Agregar al carrito
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShopStore } from '@/store/shop'
import type { Product } from '~/types/shop'

const props = defineProps<{
	product: Product
}>()

const store = useShopStore()
const userRating = ref(5)

const onAddToCart = () => {
	store.addToCart(props.product)
}

const onRateChange = (value: number | string) => {
	if (typeof value === 'number') {
		userRating.value = value
	}
}

const submitRating = () => {
	store.rateProduct(props.product.id, userRating.value)
}
</script>

<style scoped>
.product-card {
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
</style>
