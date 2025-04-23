import http from "../http-common";

export const actividadRealizadaRepository = {
    // Obtener la lista de actividades (de la tabla actividadrealizada) de un encuentro
    async get(id) {
        try {
            let response = await http.get(`/actividadrealizada/${id}/actividades`);
            return response;
        } catch (error) {
            console.error("Error al obtener actividades realizadas:", error);
            throw error;
        }
    },

    async getAll() {
        let response = await http.get(`/actividadrealizada`);

        return response;
    },
    // Crear una nueva actividad realizada
    async create(data) {
        try {
            let response = await http.post(`/actividadrealizada`, data);

            return response;
        } catch (error) {
            console.error("Error al crear actividad realizada:", error);
            throw error;
        }
    },

    async update(id, data) {
        let response = await http.put(`/os/${id}`, data);

        return response;
    },

    // Eliminar actividad realizada
    async delete(id) {
        try {
            let response = await http.delete(`/actividadrealizada/${id}`);
            return response;
        } catch (error) {
            console.error("Error al eliminar actividad realizada:", error);
            throw error;
        }
    }
    };