<template>
	<v-dialog :model-value="store.dialogs.login" @update:model-value="store.closeLogin()" max-width="460">
		<v-card>
			<v-card-title>Cuenta</v-card-title>
			<v-card-subtitle>Inicia sesion o crea tu usuario para comprar y calificar.</v-card-subtitle>

			<v-card-text class="pb-0 pt-4">
				<v-tabs v-model="tab" density="compact" color="primary" fixed-tabs>
					<v-tab value="login">Iniciar sesion</v-tab>
					<v-tab value="register">Crear cuenta</v-tab>
				</v-tabs>
			</v-card-text>

			<v-window v-model="tab">
				<v-window-item value="login">
					<v-card-text class="d-flex flex-column ga-3 mt-2">
						<v-text-field v-model="loginForm.email" label="Email" type="email" variant="outlined"
							density="comfortable" hide-details />
						<v-text-field v-model="loginForm.password" label="Contrasena" type="password" variant="outlined"
							density="comfortable" hide-details />
					</v-card-text>
				</v-window-item>

				<v-window-item value="register">
					<v-card-text class="d-flex flex-column ga-3 mt-2">
						<v-text-field v-model="registerForm.name" label="Nombre" variant="outlined"
							density="comfortable" hide-details />
						<v-text-field v-model="registerForm.email" label="Email" type="email" variant="outlined"
							density="comfortable" hide-details />
						<v-text-field v-model="registerForm.password" label="Contrasena" type="password"
							variant="outlined" density="comfortable" hint="Minimo 6 caracteres" persistent-hint />
					</v-card-text>
				</v-window-item>
			</v-window>

			<v-card-text class="pt-0">
				<v-alert v-if="store.authError" type="error" variant="tonal" density="compact">
					{{ store.authError }}
				</v-alert>
			</v-card-text>

			<v-card-actions class="px-6 pb-5">
				<v-btn variant="text" class="text-none" @click="store.closeLogin()">Cancelar</v-btn>
				<v-spacer />
				<v-btn v-if="tab === 'login'" color="primary" class="text-none" @click="submitLogin">Entrar</v-btn>
				<v-btn v-else color="primary" class="text-none" @click="submitRegister">Crear usuario</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useShopStore } from '~/store/shop'

const store = useShopStore()
const tab = ref<'login' | 'register'>('login')

const loginForm = reactive({
	email: '',
	password: '',
})

const registerForm = reactive({
	name: '',
	email: '',
	password: '',
})

const submitLogin = () => {
	const ok = store.login({
		email: loginForm.email,
		password: loginForm.password,
	})

	if (!ok) return
	loginForm.password = ''
}

const submitRegister = () => {
	const ok = store.register({
		name: registerForm.name,
		email: registerForm.email,
		password: registerForm.password,
	})

	if (!ok) return
	registerForm.password = ''
}
</script>
