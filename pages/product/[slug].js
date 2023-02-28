import { addToCart } from '../../utilities/slices/shopSlice';
import { useDispatch } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Rating,
  Card,
  Button,
} from '@mui/material';

import Image from 'next/image';
import Layout from '../../cpm/Layout';

const productSingle = ({ result }) => {
  const dispatch = useDispatch();
  const product = result.result;
  const addToCartHandler = () => {
    dispatch(addToCart(product));
    console.log(product._id);
  };
  if (!product) {
    return (
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        No product found
      </Typography>
    );
  }
  return (
    <Layout title={product.name} description={product.description}>
      {console.log(product.name)}
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            layout="responsive"
            height="640"
            width="640"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h3">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="caption">brand</Typography>}
                secondary={
                  <Typography variant="h6">{product.brand}</Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="caption">category</Typography>}
                secondary={
                  <Typography variant="h6">{product.category}</Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="caption">rating</Typography>}
                secondary={
                  <>
                    <Rating
                      name="rating"
                      value={product.rating}
                      precision={0.25}
                      readOnly
                    />
                    <Typography>{product.numReviews} reviews</Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="caption">description</Typography>}
                secondary={
                  <Typography variant="h6">{product.description}</Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={3}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography variant="h6">Price</Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography variant="h6">${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography variant="h6">Status</Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography variant="h6">
                      {product.countInStock > 0 ? 'in stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                  <Button
                    fullWidth
                    sx={{ marginTop: '20px' }}
                    variant="contained"
                    color="secondary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const slug = query.slug;
  const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  const result = await res.json();

  return { props: { result } };
};

export default productSingle;
