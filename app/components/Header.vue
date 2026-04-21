<template>
	<v-app-bar flat color="white" height="74" class="header-shell">
		<v-container class="d-flex align-center ga-4 px-2 px-md-4">
			<button class="brand" @click="navigateTo('/')" type="button">
				<span class="text-grey-darken-1">BZ</span><span class="text-black">tore</span>
			</button>

			<div class="search-input">
				<SearchInput :model-value="store.filters.search" @update:model-value="store.setSearch" />
			</div>

			<div class="actions d-flex align-center ga-1 ga-md-2">
				<v-btn icon="mdi-heart-outline" variant="text" size="small" />

				<v-btn icon variant="tonal" color="primary" size="small" @click="store.openCart()"
					:class="{ pulse: cartPulse }">
					<v-badge v-if="store.cartCount > 0" :content="store.cartCount" color="error" offset-x="1"
						offset-y="1">
						<v-icon icon="mdi-cart-outline" />
					</v-badge>
					<v-icon v-else icon="mdi-cart-outline" />
				</v-btn>

				<v-menu v-if="store.isAuthenticated" location="bottom end">
					<template #activator="{ props }">
						<v-btn v-bind="props" icon="mdi-account-circle-outline" variant="text" size="small" />
					</template>
					<v-list density="compact" min-width="220">
						<v-list-item :title="store.user?.name || ''" :subtitle="store.user?.email || ''" />
						<v-divider />
						<v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" @click="store.logout()" />
					</v-list>
				</v-menu>

				<v-btn v-else variant="text" prepend-icon="mdi-account-outline"
					class="text-none d-none d-md-inline-flex" @click="store.openLogin()">
					Iniciar sesión
				</v-btn>
			</div>
		</v-container>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchInput from '~/components/SearchInput.vue'
import { useShopStore } from '~/store/shop'

const store = useShopStore()
const cartPulse = ref(false)

watch(
	() => store.ui.cartPulseKey,
	() => {
		cartPulse.value = true
		setTimeout(() => {
			cartPulse.value = false
		}, 260)
	},
)
</script>

<style scoped>
.header-shell {
	border-bottom: 1px solid #e8e8e8;
}

.brand {
	border: 0;
	background: transparent;
	font-size: 1.35rem;
	font-weight: 900;
	letter-spacing: -0.4px;
	cursor: pointer;
}

.search-input {
	max-width: 640px;
	width: 100%;
}

.pulse {
	animation: cart-pulse 0.26s ease;
}

@keyframes cart-pulse {
	0% {
		transform: scale(1);
	}

	45% {
		transform: scale(1.16);
	}

	100% {
		transform: scale(1);
	}
}

@media (max-width: 959px) {
	.search-input {
		max-width: 360px;
	}
}
</style>
