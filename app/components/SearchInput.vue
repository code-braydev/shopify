<template>
    <v-text-field :model-value="modelValue" @update:model-value="onUpdate" :placeholder="placeholder" density="compact"
        variant="solo-filled" flat bg-color="grey-lighten-4" prepend-inner-icon="mdi-magnify" hide-details
        class="search-input" />
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string
        placeholder?: string
    }>(),
    {
        placeholder: 'Busca laptops, audio, accesorios...',
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const onUpdate = (value: string | null) => {
    emit('update:modelValue', value ?? '')
}
</script>

<style scoped>
.search-input {
    width: 100%;
}
</style>
