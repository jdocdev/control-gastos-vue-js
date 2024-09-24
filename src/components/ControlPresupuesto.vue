<script setup>
import { computed } from "vue";
import { formatearCantidad } from "../helpers";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

const props = defineProps({
    presupuesto: {
        type: Number,
        required: true,
    },
    disponible: {
        type: Number,
        required: true,
    },
    gastado: {
        type: Number,
        required: true,
    },
});

const porcentaje = computed(() => {
    return parseInt(
        ((props.presupuesto - props.disponible) / props.presupuesto) * 100
    );
});
</script>

<template>
    <section>
        <div class="px-4 py-8 my-4 bg-gray-50 rounded-sm shadow-lg">
            <div class="px-4 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-16">
                <div
                    class="flex justify-center items-center h-full overflow-hidden rounded-lg relative"
                >
                    <p class="absolute text-2xl font-bold text-rose-600">{{porcentaje}}%</p>
                    <CircleProgress
                        :percent="porcentaje"
                        :size="250"
                        :border-width="30"
                        :border-bg-width="30"
                        fill-color="#E11D48"
                    />
                </div>

                <div
                    class="lg:py-24 flex flex-col justify-center items-center h-full overflow-hidden rounded-lg"
                >
                    <div>
                        <p class="mt-4 text-xl">
                            <span class="text-gray-900 font-bold">Presupuesto:{{ " " }}</span>
                            <span class="text-rose-600">{{ formatearCantidad(presupuesto) }}</span>
                        </p>

                        <p class="mt-4 text-xl">
                            <span class="text-gray-900 font-bold">Disponible:{{ " " }}</span>
                            <span class="text-rose-600">{{ formatearCantidad(disponible) }}</span>
                        </p>

                        <p class="mt-4 text-xl">
                            <span class="text-gray-900 font-bold">Gastos:{{ " " }}</span>
                            <span class="text-rose-600">{{ formatearCantidad(gastado) }}</span>
                        </p>
                    </div>
                </div>

                <article
                    class="relative overflow-hidden rounded-sm shadow transition hover:shadow-sm hidden lg:block lg:col-span-2"
                >
                    <img
                        alt="Control de presupuesto"
                        src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                        class="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                        class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64"
                    >
                        <div class="p-4 sm:p-6">
                            <a href="#">
                                <h3 class="mt-0.5 text-lg text-white">
                                    Cómo gestionar eficientemente tu presupuesto
                                </h3>
                            </a>
                            <p
                                class="mt-2 line-clamp-3 text-sm/relaxed text-white/95"
                            >
                                Un control de presupuesto te ayuda a priorizar
                                tus gastos y asegurarte de que tus metas
                                financieras se mantengan en el buen camino.
                                Descubre cómo administrar tus ingresos y gastos
                                de manera eficiente para evitar sorpresas al
                                final del mes.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contenedor-grafico {
    position: relative;
}

.porcentaje {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    font-weight: bold;
    color: #E11D48; 
}
</style>
