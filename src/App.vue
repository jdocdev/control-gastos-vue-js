<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import Gasto from "./components/Gasto.vue";
import Modal from "./components/Modal.vue";
import Filtro from "./components/Filtro.vue";

const modal = reactive({
    mostrar: false,
    animar: false,
});
const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);
const filtro = ref("");

const gasto = reactive({
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    fecha: Date.now(),
});

const gastos = ref([]);

watch(
    gastos,
    () => {
        const totalGastado = gastos.value.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );
        gastado.value = totalGastado;
        disponible.value = presupuesto.value - totalGastado;

        localStorage.setItem("gastos", JSON.stringify(gastos.value));
    },
    {
        deep: true,
    }
);

watch(
    modal,
    () => {
        if (!modal.mostrar) {
            reinicarStateGasto();
        }
    },
    {
        deep: true,
    }
);

watch(presupuesto, () => {
    localStorage.setItem("presupuesto", presupuesto.value);
});

onMounted(() => {
    const presupuestoStorage = localStorage.getItem("presupuesto");
    if (presupuestoStorage) {
        presupuesto.value = Number(presupuestoStorage);
        disponible.value = Number(presupuestoStorage);
    }

    const gastosStorage = localStorage.getItem("gastos");
    if (gastosStorage) {
        gastos.value = JSON.parse(gastosStorage);
    }
});

const reinicarStateGasto = () => {
    Object.assign(gasto, {
        nombre: "",
        cantidad: "",
        categoria: "",
        id: null,
        fecha: Date.now(),
    });
};

const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad;
    disponible.value = cantidad;
};

const mostrarModal = () => {
    modal.mostrar = true;
    setTimeout(() => {
        modal.animar = true;
    }, 300);
};

const ocultarModal = () => {
    modal.animar = false;
    setTimeout(() => {
        modal.mostrar = false;
    }, 300);
};

const guardarGasto = () => {
    let id = crypto.randomUUID();

    if (gasto.id) {
        const { id } = gasto;
        const i = gastos.value.findIndex((gasto) => gasto.id === id);
        gastos.value[i] = { ...gasto };
    } else {
        gastos.value.push({
            ...gasto,
            id: id,
        });
    }

    ocultarModal();
    reinicarStateGasto();
};

const seleccionarGasto = (id) => {
    const gastoEditar = gastos.value.filter((gasto) => gasto.id === id)[0];
    Object.assign(gasto, gastoEditar);
    mostrarModal();
};

const eliminarGasto = () => {
    if (confirm(`¿Estás seguro de eliminar el gasto "${gasto.nombre}"?`)) {
        gastos.value = gastos.value.filter(
            (gastoState) => gastoState.id !== gasto.id
        );
        ocultarModal();
    }
};

const gastosFiltrados = computed(() => {
    if (filtro.value) {
        return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
    }
    return gastos.value;
});

const resetApp = () => {
    if (
        confirm(
            `¿Estás seguro de reiniciar el app? Todos los datos serán eliminados.`
        )
    ) {
        gastos.value = [];
        presupuesto.value = 0;
    }
};
</script>

<template>
    <div :class="{ fijar: modal.mostrar }">
        <header class="border-b border-gray-200 bg-gray-50 mx-8">
            <div class="mx-auto w-full px-8 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div
                    class="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div>
                        <h1
                            class="text-2xl font-bold text-gray-900 sm:text-3xl"
                        >
                            Planificador de gastos
                        </h1>

                        <p class="mt-1.5 text-md text-gray-600">
                            Mantente al tanto registrando tus gastos del día.
                        </p>
                    </div>

                    <div
                        v-if="presupuesto !== 0"
                        class="flex items-center gap-4"
                    >
                        <button
                            class="inline-block bg-rose-600 px-5 py-3 text-md font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring rounded-sm"
                            type="button"
                            @click="resetApp"
                        >
                            Reiniciar APP
                            <i className="bi bi-stars text-lg ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-4 sm:gap-4 mx-8">
            <Presupuesto
                class="col-span-4"
                v-if="presupuesto === 0"
                @definir-presupuesto="definirPresupuesto"
            />
            <ControlPresupuesto
                v-else
                class="col-span-4"
                :presupuesto="presupuesto"
                :disponible="disponible"
                :gastado="gastado"
            />
        </div>

        <Filtro
            class="py-8 bg-gray-50 rounded-sm shadow-lg px-4 mb-4"
            v-if="presupuesto !== 0"
            v-model:filtro="filtro"
        />

        <div v-if="presupuesto > 0" class="crear-gasto">
            <button 
            @click="mostrarModal"
            title="Click para agregar un gasto"
            >
                <i
                    class="bi bi-plus-circle-fill text-6xl ml-2 text-rose-600 hover:text-rose-700 transition-all cursor-pointer"
                ></i>
            </button>
        </div>

        <div v-if="gastosFiltrados.length > 0" class="mx-8">
            <h2
                class="py-8 mb-4 bg-gray-50 rounded-sm shadow-lg px-4 text-1xl font-bold text-gray-900 sm:text-2xl"
            >
                Listado de gastos
            </h2>
            <div
                :class="{
                    'grid grid-cols-1 lg:grid-cols-1':
                        gastosFiltrados.length === 1, // 1 elemento ocupa todo el ancho
                    'grid grid-cols-2': gastosFiltrados.length === 2, // 2 elementos ocupan mitad y mitad
                    'grid grid-cols-1 lg:grid-cols-3':
                        gastosFiltrados.length > 2, // 3 o más elementos ocupan de 1 a 3 columnas
                }"
                class="gap-4"
            >
                <Gasto
                    class="py-8 bg-gray-50 rounded-sm shadow-lg px-4"
                    v-for="gasto in gastosFiltrados"
                    :key="gasto.id"
                    :gasto="gasto"
                    @seleccionar-gasto="seleccionarGasto"
                />
            </div>
        </div>

        <Modal
            v-if="modal.mostrar"
            v-model:nombre="gasto.nombre"
            v-model:cantidad="gasto.cantidad"
            v-model:categoria="gasto.categoria"
            @ocultarModal="ocultarModal"
            @guardar-gasto="guardarGasto"
            @eliminar-gasto="eliminarGasto"
            :modal="modal"
            :disponible="disponible"
            :presupuesto="presupuesto"
            :id="gasto.id"
        />
    </div>
</template>

<style scoped>
.crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
}
</style>
