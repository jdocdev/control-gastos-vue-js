<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";
import { formatearCantidad } from "../helpers";

const error = ref("");

const emit = defineEmits([
    "ocultar-modal",
    "guardar-gasto",
    "eliminar-gasto",
    "update:nombre",
    "update:cantidad",
    "update:categoria",
]);
const props = defineProps({
    modal: {
        type: Object,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    cantidad: {
        type: [String, Number],
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    disponible: {
        type: Number,
        required: true,
    },
    presupuesto: {
        type: Number,
        required: true,
    },
    id: {
        type: [String, null],
        required: true,
    },
});

const old = props.cantidad;

const agregarGasto = () => {
    const { nombre, cantidad, categoria, disponible, presupuesto, id } = props;
    if ([nombre, cantidad, categoria].includes("")) {
        error.value = "Todos los campos son obligatorios";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    if (id) {
        if (cantidad > old + disponible) {
            error.value = `El valor debe ser menor a ${formatearCantidad(
                old + disponible
            )} COP`;
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    } else {
        if (cantidad <= 0) {
            error.value = `El valor debe ser mayor a ${formatearCantidad(
                cantidad
            )} COP`;
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    }

    emit("guardar-gasto");
};
</script>

<template>
    <div class="container-modal" :class="[modal.animar ? 'animar' : 'cerrar']">
        <div
            class="px-4 py-8 mt-12 mx-auto max-w-lg bg-gray-50 rounded-sm shadow-lg"
        >
            <div class="mx-auto max-w-xl">
                <button
                    class="cerrar-modal w-full text-end mb-8 cursor-pointer"
                    @click="($event) => $emit('ocultar-modal')"
                >
                    <i
                        class="bi bi-x-circle-fill text-3xl text-rose-600 hover:text-rose-700 transition-all mr-7"
                    ></i>
                </button>

                <h1
                    class="text-center text-2xl font-bold text-gray-900 sm:text-3xl"
                >
                    {{ id !== null ? "Editar gasto" : "Resgistrar gasto" }}
                </h1>

                <Alerta v-if="error" class="mt-8"> {{ error }} </Alerta>

                <form
                    @submit.prevent="agregarGasto"
                    class="mb-0 mt-2 space-y-4 p-4 sm:p-6 lg:p-8"
                >
                    <div class="">
                        <label for="nombre-gasto" class="text-gray-600"
                            >Nombre:</label
                        >

                        <div class="relative mt-3">
                            <input
                                type="text"
                                class="w-full rounded-sm border-gray-200 p-4 pe-12 shadow-sm text-md"
                                placeholder="Añade el nombre del gasto"
                                id="nombre-gasto"
                                :value="nombre"
                                @input="
                                    ($event) =>
                                        $emit(
                                            'update:nombre',
                                            $event.target.value
                                        )
                                "
                            />
                        </div>
                    </div>

                    <div class="pt-3">
                        <label for="nuevo-presupuesto" class="text-gray-600"
                            >Valor en COP:</label
                        >

                        <div class="relative mt-3">
                            <input
                                type="number"
                                class="w-full rounded-sm border-gray-200 p-4 pe-12 shadow-sm text-md"
                                placeholder="Añade el valor. Ej. 3000"
                                id="nuevo-presupuesto"
                                min="0"
                                :value="cantidad"
                                @input="
                                    ($event) =>
                                        $emit(
                                            'update:cantidad',
                                            +$event.target.value
                                        )
                                "
                            />

                            <span
                                class="absolute inset-y-0 end-0 grid place-content-center px-4"
                            >
                                <i
                                    class="bi bi-cash-coin size-4 text-gray-400"
                                ></i>
                            </span>
                        </div>
                    </div>

                    <div class="relative py-3">
                        <label for="categoria" class="text-gray-600"
                            >Categoría:</label
                        >
                        <div class="relative mt-3 w-full">
                            <select
                                name="categoria"
                                id="categoria"
                                class="w-full rounded-sm bg-white border-gray-200 p-4 pe-12 shadow-sm text-md appearance-none"
                                :value="categoria"
                                @input="
                                    ($event) =>
                                        $emit(
                                            'update:categoria',
                                            $event.target.value
                                        )
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
                                <option value="gastosvarios">
                                    Gastos Varios
                                </option>
                                <option value="inversiones">Inversiones</option>
                                <option value="deudas">Deudas</option>
                                <option value="seguros">Seguros</option>
                                <option value="impuestos">Impuestos</option>
                                <option value="donaciones">Donaciones</option>

                                <option value="ropa">Ropa y Accesorios</option>
                                <option value="electronicos">
                                    Electrónicos
                                </option>
                                <option value="transporte">Transporte</option>
                                <option value="entretenimiento">
                                    Entretenimiento
                                </option>
                                <option value="otrosGastos">
                                    Otros Gastos
                                </option>
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

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 pt-6">
                        <button
                            type="submit"
                            class="block w-full rounded-sm bg-rose-600 px-5 py-3 mb-3 font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring text-md"
                        >
                            {{ id !== null ? "Guardar" : "Añadir" }}
                        </button>

                        <button
                            v-if="id !== null"
                            type="button"
                            class="block w-full rounded-sm bg-gray-600 px-5 py-3 mb-3 font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring text-md"
                            @click="($event) => $emit('eliminar-gasto', id)"
                        >
                            Eliminar
                        </button>
                        <button
                            v-else
                            type="button"
                            class="block w-full rounded-sm bg-gray-600 px-5 py-3 mb-3 font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring text-md"
                            @click="($event) => $emit('ocultar-modal')"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.container-modal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.container-modal.animar {
    opacity: 1;
}

.container-modal.cerrar {
    opacity: 0;
}

.container-modal {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
}

.fijar {
    overflow: hidden;
    height: 100vh;
}
</style>
