<script setup>
const props = defineProps({
    filtro: {
        type: String,
        required: true,
    },
});

defineEmits(["update:filtro"]);
</script>

<template>
    <div
        class="flex flex-col md:flex-row items-center gap-4 mx-8 justify-center"
    >
        <div
            class="relative py-3 w-full flex flex-col md:flex-row items-center mx-4"
        >
            <label
                for="filtro"
                class="text-lg text-gray-900 flex-shrink-0 mb-2 md:mb-0 md:mr-4"
            >
                <span class="font-bold">Filtrar gastos por categoría: </span>
            </label>
            <div class="relative w-full">
                <select
                    name="filtro"
                    id="filtro"
                    class="w-full rounded-sm bg-white border-gray-200 p-4 pe-12 shadow-sm text-center text-md appearance-none"
                    @value="filtro"
                    @input="
                        ($event) => $emit('update:filtro', $event.target.value)
                    "
                >
                    <option class="text-gray-600" value="">
                        -- Seleccione --
                    </option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="salud">Salud</option>
                    <option value="educacion">Educación</option>
                    <option value="ocio">Ocio</option>
                    <option value="viajes">Viajes</option>
                    <option value="gastosvarios">Gastos Varios</option>
                    <option value="inversiones">Inversiones</option>
                    <option value="deudas">Deudas</option>
                    <option value="seguros">Seguros</option>
                    <option value="impuestos">Impuestos</option>
                    <option value="donaciones">Donaciones</option>
                    <option value="ropa">Ropa y Accesorios</option>
                    <option value="electronicos">Electrónicos</option>
                    <option value="transporte">Transporte</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="otrosGastos">Otros Gastos</option>
                </select>
                <span
                    class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
