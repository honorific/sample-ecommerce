import Layout from '../cpm/Layout';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { changeCartCount, removeFromCart } from '../utilities/slices/shopSlice';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  CardActions,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartInfo = useSelector(
    (state) => state.rootReducer.shopState.productAdded
  );
  const totalCart = useSelector(
    (state) => state.rootReducer.shopState.totalCart
  );
  const handleChange = (e, a) => {
    dispatch(changeCartCount({ index: a, value: e.target.value }));
  };
  const handleRemove = (e, a) => {
    dispatch(removeFromCart({ index: a }));
  };
  const checkoutHandler = () => {
    router.push('shipping');
  };
  console.log(cartInfo);
  return (
    <Layout title="cart" description="cart info">
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>Image</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Quantity</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>price</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartInfo.map((item, cartIndex) => {
                  return (
                    <TableRow key={item.product._id}>
                      <TableCell>
                        <NextLink
                          href={`/product/${item.product.slug}`}
                          passHref
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={50}
                            height={50}
                            style={{ cursor: 'pointer' }}
                          />
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.product.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <Select
                            value={item.count}
                            displayEmpty
                            onChange={(e, a) => handleChange(e, cartIndex)}
                          >
                            <MenuItem value="">0</MenuItem>
                            {Array.from(
                              { length: item.product.countInStock },
                              (v, i) => i
                            ).map((x) => {
                              return (
                                <MenuItem value={x + 1} key={x}>
                                  {x + 1}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.product.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e, a) => handleRemove(e, cartIndex)}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                your total items: {totalCart}
              </Typography>
              <Typography variant="button">
                your total price: $
                {cartInfo.reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    currentValue.count * currentValue.product.price,
                  0
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={checkoutHandler}
              >
                checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;
