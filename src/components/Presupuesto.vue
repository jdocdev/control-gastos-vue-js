<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";

const presupuesto = ref(0);
const error = ref("");
const emit = defineEmits(["definir-presupuesto"]);
const definirPresupuesto = () => {
    if (presupuesto.value <= 0 || presupuesto.value === "") {
        error.value = "El presupuesto debe ser mayor a $ 1,00 COP";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    emit("definir-presupuesto", presupuesto.value);
};
</script>

<template>
    <div class="px-4 py-8 my-4 bg-gray-50 rounded-sm shadow-lg">
        <div class="mx-auto max-w-xl">
            <h1
                class="text-center text-2xl font-bold text-gray-900 sm:text-3xl"
            >
                Presupuesto
            </h1>

            <p class="mx-auto mt-2 max-w-md text-md text-center text-gray-600">
                Con el cual deseas iniciar.
            </p>

            <Alerta class="mt-8" v-if="error">
                {{ error }}
            </Alerta>

            <form
                class="mb-0 mt-2 space-y-4 p-4 sm:p-6 lg:p-8"
                @submit.prevent="definirPresupuesto"
            >
                <div>
                    <label for="nuevo-presupuesto" class="sr-only"
                        >presupuesto</label
                    >

                    <div class="relative">
                        <input
                            type="number"
                            class="w-full rounded-sm border-gray-200 p-4 pe-12 shadow-sm text-md"
                            placeholder="Añade tu presupuesto"
                            id="nuevo-presupuesto"
                            v-model.number="presupuesto"
                            min="0"
                        />

                        <span
                            class="absolute inset-y-0 end-0 grid place-content-center px-4"
                        >
                            <i class="bi bi-cash-coin size-4 text-gray-400"></i>
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    class="block w-full rounded-sm bg-rose-600 px-5 py-3 font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring text-md"
                >
                    Aceptar
                </button>
            </form>
        </div>
    </div>
</template>
