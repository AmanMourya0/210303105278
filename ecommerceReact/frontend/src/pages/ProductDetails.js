import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/api1';
import { Container, Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProducts().then(response => {
            const foundProduct = response.data.find(p => p.id === id);
            setProduct(foundProduct);
        }).catch(error => {
            console.error('Failed to fetch product details', error);
        });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={`https://picsum.photos/500?random=${product.id}`}
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
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetails;
