<template>
	<v-dialog :model-value="store.dialogs.cart" @update:model-value="store.closeCart()" max-width="860">
		<v-card>
			<v-card-title class="d-flex align-center justify-space-between">
				<span>Carrito de compras</span>
				<v-btn icon="mdi-close" variant="text" @click="store.closeCart()" />
			</v-card-title>

			<v-divider />

			<v-card-text v-if="store.cart.length === 0" class="py-12 text-center text-grey-darken-1">
				Tu carrito está vacío.
			</v-card-text>

			<v-card-text v-else>
				<v-row>
					<v-col cols="12" md="8">
						<v-list lines="two">
							<v-list-item v-for="item in store.cart" :key="item.id" class="px-0">
								<template #prepend>
									<v-avatar rounded="0" size="64" class="mr-3">
										<v-img :src="item.image" cover />
									</v-avatar>
								</template>

								<v-list-item-title class="font-weight-medium">{{ item.name }}</v-list-item-title>
								<v-list-item-subtitle>{{ store.formatPrice(item.price) }}</v-list-item-subtitle>

								<template #append>
									<div class="d-flex align-center ga-2">
										<v-btn icon="mdi-minus" size="x-small" variant="outlined"
											@click="store.decrementQty(item.id)" />
										<span class="text-body-2">{{ item.quantity }}</span>
										<v-btn icon="mdi-plus" size="x-small" variant="outlined"
											@click="store.incrementQty(item.id)" />
										<v-btn icon="mdi-delete-outline" size="x-small" variant="text" color="error"
											@click="store.removeFromCart(item.id)" />
									</div>
								</template>
							</v-list-item>
						</v-list>
					</v-col>

					<v-col cols="12" md="4">
						<v-sheet border rounded="lg" class="pa-4">
							<v-progress-linear v-if="store.checkoutState === 'processing'" indeterminate color="primary"
								class="mb-4" />

							<div class="d-flex justify-space-between text-body-2 mb-2">
								<span>Subtotal</span>
								<strong>{{ store.formatPrice(store.cartSubtotal) }}</strong>
							</div>
							<div class="d-flex justify-space-between text-body-2 mb-2">
								<span>Envío</span>
								<strong>{{ store.formatPrice(store.shipping) }}</strong>
							</div>
							<v-divider class="my-3" />
							<div class="d-flex justify-space-between text-subtitle-1 mb-4">
								<span>Total</span>
								<strong>{{ store.formatPrice(store.cartTotal) }}</strong>
							</div>

							<v-alert v-if="!store.isAuthenticated" type="info" variant="tonal" density="compact"
								class="mb-4">
								Inicia sesión para continuar con el pago.
							</v-alert>

							<v-btn v-if="!store.isAuthenticated" block color="primary" class="text-none"
								@click="openLoginFromCart">
								Iniciar sesión
							</v-btn>

							<div v-else class="d-flex flex-column ga-3">
								<v-text-field v-model="payment.card" label="Tarjeta" variant="outlined"
									density="compact" maxlength="19" hide-details />
								<v-text-field v-model="payment.name" label="Nombre en tarjeta" variant="outlined"
									density="compact" hide-details />
								<v-row>
									<v-col cols="6">
										<v-text-field v-model="payment.exp" label="MM/AA" variant="outlined"
											density="compact" hide-details />
									</v-col>
									<v-col cols="6">
										<v-text-field v-model="payment.cvv" label="CVV" variant="outlined"
											density="compact" hide-details />
									</v-col>
								</v-row>

								<v-btn block color="primary" class="text-none"
									:loading="store.checkoutState === 'processing'" @click="pay">
									Pagar ahora
								</v-btn>
							</div>

							<v-alert v-if="store.checkoutError" type="error" variant="tonal" density="compact"
								class="mt-4">
								{{ store.checkoutError }}
							</v-alert>

							<transition name="checkout-pop">
								<v-sheet v-if="store.checkoutState === 'success'" class="success-shell mt-4 pa-4"
									rounded="lg" border>
									<div class="success-badge mb-3">✔</div>
									<div class="text-subtitle-1 font-weight-bold">Pago aprobado</div>
									<div class="text-body-2 text-grey-darken-1">Tu orden fue creada con exito.</div>
								</v-sheet>
							</transition>
						</v-sheet>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useShopStore } from '~/store/shop'
import type { PaymentPayload } from '~/types/shop'

const store = useShopStore()

const payment = reactive<PaymentPayload>({
	card: '',
	name: '',
	exp: '',
	cvv: '',
})

const openLoginFromCart = () => {
	store.closeCart()
	store.openLogin()
}

const pay = async () => {
	const ok = await store.simulatePayment({
		card: payment.card,
		name: payment.name,
		exp: payment.exp,
		cvv: payment.cvv,
	})

	if (!ok) return
	payment.card = ''
	payment.name = ''
	payment.exp = ''
	payment.cvv = ''
}
</script>

<style scoped>
.success-shell {
	text-align: center;
	background: linear-gradient(145deg, #f5fff7, #ffffff);
}

.success-badge {
	width: 42px;
	height: 42px;
	margin: 0 auto;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: #2e7d32;
	color: #fff;
	font-weight: 800;
	box-shadow: 0 8px 18px rgba(46, 125, 50, 0.2);
}

.checkout-pop-enter-active,
.checkout-pop-leave-active {
	transition: all 0.28s ease;
}

.checkout-pop-enter-from,
.checkout-pop-leave-to {
	opacity: 0;
	transform: translateY(8px) scale(0.98);
}
</style>
