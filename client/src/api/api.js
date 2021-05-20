import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api'
})

export const api = {
    async getShows() {
        try {
            const response = await instance.get('/shows');
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async getMovies() {
        try {
            const response = await instance.get('/movies');
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async addItem() {
        try {
            const response = await instance.post('/add');
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async editItem() {
        try {
            const response = await instance.update('/edit');
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async removeItem() {
        try {
            const response = await instance.del('/remove');
            return response;
        } catch (error) {
            return error.response;
        }
    }

}