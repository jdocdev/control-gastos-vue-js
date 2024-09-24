export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP'
    })
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-Es', opciones)
}