import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api1';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categories = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [top, setTop] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const fetchProducts = () => {
        if (company && category) {
            getProducts(company, category, top, minPrice, maxPrice).then(response => {
                setProducts(response.data);
            }).catch(error => {
                console.error('Failed to fetch products', error);
            });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [company, category, top, minPrice, maxPrice]);

    return (
        <Container>
            <FormControl fullWidth margin="normal">
                <InputLabel>Company</InputLabel>
                <Select value={company} onChange={e => setCompany(e.target.value)}>
                    {companies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                margin="normal"
                label="Top N Products"
                type="number"
                value={top}
                onChange={e => setTop(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={fetchProducts}>Fetch Products</Button>
            <Grid container spacing={3} marginTop={3}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://picsum.photos/200?random=${product.id}`}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.company} - {product.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rating: {product.rating}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discount: {product.discount}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.availability ? 'Available' : 'Out of Stock'}
                                </Typography>
                                <Button variant="contained" color="primary" component={Link} to={`/product/${product.id}`}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllProducts;
