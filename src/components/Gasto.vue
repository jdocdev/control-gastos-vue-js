<script setup>
import { formatearCantidad, formatearFecha } from "../helpers";

const iconosCategoria = {
    ahorro: "bi-piggy-bank",
    comida: "bi-egg-fried",
    casa: "bi-house-heart",
    salud: "bi-heart-pulse",
    educacion: "bi-journal-bookmark",
    ocio: "bi-controller",
    viajes: "bi-airplane-engines",
    gastosvarios: "bi-cash-coin",
    inversiones: "bi-graph-up-arrow",
    deudas: "bi-credit-card",
    seguros: "bi-shield-lock",
    impuestos: "bi-file-earmark-text",
    donaciones: "bi-gift",
    ropa: "bi-bag",
    electronicos: "bi-laptop",
    transporte: "bi-car-front",
    entretenimiento: "bi-film",
    otrosGastos: "bi-cash",
};

const props = defineProps({
    gasto: {
        type: Object,
        required: true,
    },
});

defineEmits(["seleccionar-gasto"]);
</script>

<template>
    <div
        class="flex items-center gap-4 cursor-pointer"
        @click="($event) => $emit('seleccionar-gasto', gasto.id)"
        title="Click para editar gasto"
    >
        <div>
            <i
                :class="`bi ${
                    iconosCategoria[gasto.categoria]
                } text-8xl text-rose-600 px-4`"
            ></i>
        </div>

        <div>
            <p class="mt-0.5 text-lg text-gray-900">
                <span class="font-bold">Agregado: </span>
                {{ formatearFecha(gasto.fecha) }}
            </p>
            <p class="mt-0.5 text-lg text-gray-900">
                <span class="font-bold">Cantidad: </span>
                {{ formatearCantidad(gasto.cantidad) }}
            </p>
            <p class="mt-0.5 text-lg text-gray-900">
                <span class="font-bold">Descripción: </span>
                {{ gasto.nombre }}
            </p>
            <p class="mt-0.5 text-lg text-gray-900">
                <span class="font-bold">Categoría: </span>
                {{ gasto.categoria }}
            </p>
        </div>
    </div>
</template>
