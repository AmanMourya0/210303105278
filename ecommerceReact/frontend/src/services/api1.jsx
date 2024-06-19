import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const getProducts = (company, category, top, minPrice, maxPrice) => {
    return axios.get(`${API_BASE_URL}/products`, {
        params: { company, category, top, minPrice, maxPrice }
    });
};
