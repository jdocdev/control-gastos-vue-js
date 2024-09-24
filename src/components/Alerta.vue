<template>
    <div role="alert" class="rounded-sm border border-gray-100 bg-rose-50 mx-8 p-4">
        <div class="flex items-center gap-4 justify-between">
            <span class="text-rose-600 text-lg">
                <i class="bi bi-exclamation-square-fill"></i>
            </span>

            <div class="flex-1">
                <slot class="block font-medium text-gray-900">
                </slot>
            </div>
        </div>
    </div>
</template>
