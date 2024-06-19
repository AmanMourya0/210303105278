const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv') 


app.use(cors());
dotenv.config();
app.use(express.json());
const port=process.env.PORT || 4000

app.get('/products', async (req, res) => {
    const { company, category, top, minPrice, maxPrice } = req.query;
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
            params: { top, minPrice, maxPrice }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch products', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});