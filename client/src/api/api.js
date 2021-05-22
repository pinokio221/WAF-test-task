import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/content'
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
    async titleValidation(title, category) {
        try {
            const response = await instance.get(`/validation?title=${title}&category=${category}`);
            return response;
            
        } catch (error) {
            return error.response;
        }
    },
    async addItem(data) {
        try {
            const response = await instance.post('/add', { data })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateItem(data) {
        console.log(data)
        try {
            const response = await instance.put('/update', {data});
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async removeItem(id, category) {
        try {
            console.log(id, category)
            const response = await instance.delete(`/remove?id=${id}&category=${category}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

}