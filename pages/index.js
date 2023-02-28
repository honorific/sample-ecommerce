import Layout from '../cpm/Layout';
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utilities/slices/shopSlice';

import {
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

const Home = ({ result }) => {
  const data = result.result;
  const dispatch = useDispatch();
  function addToCartClickHandler(id) {
    dispatch(addToCart(id));
  }
  return (
    <Layout>
      <div>
        <Typography
          variant="h3"
          sx={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Products
        </Typography>
        <Grid container spacing={3}>
          {data.map((product) => {
            return (
              <Grid item md={4} xs={6} key={product.name}>
                <Card key={product.name} sx={{ marginBottom: '20px' }}>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                      />
                    </CardActionArea>
                  </NextLink>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>${product.price}</Typography>
                    <Button onClick={() => addToCartClickHandler(product)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);
  const result = await res.json();
  return { props: { result } };
};

export default Home;
