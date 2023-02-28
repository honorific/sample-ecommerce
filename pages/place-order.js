import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import StepperCpm from '../cpm/StepperCpm';
import paymentSteps from '../utilities/PaymentSteps';
import Layout from '../cpm/Layout';
import {
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from '@mui/material';
const placeOrder = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.rootReducer.userState.info);
  const userSelectedPaymentMethod = useSelector(
    (state) => state.rootReducer.userState.paymentMethod
  );
  const userProductAdded = useSelector(
    (state) => state.rootReducer.shopState.productAdded
  );
  const totalCart = useSelector(
    (state) => state.rootReducer.shopState.totalCart
  );
  const cartInfo = useSelector(
    (state) => state.rootReducer.shopState.productAdded
  );

  const userShippingInfo = useSelector(
    (state) => state.rootReducer.userState.shipping
  );
  const clickHandler = async (e) => {
    e.preventDefault();
    console.log('clicked me');
    const rawBody = {
      name: userShippingInfo.name,
      address: userShippingInfo.address,
      city: userShippingInfo.city,
      postalCode: userShippingInfo.postalCode,
      country: userShippingInfo.country,
      paymentMethod: userSelectedPaymentMethod,
      itemBought: userProductAdded.map((item) => {
        return {
          product: item.product._id,
          count: item.count,
        };
      }),
    };
    const rawResponse = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawBody),
    });
    const response = await rawResponse.json();
    console.log(response);
    router.push(`/order/${response.data._id}`);
  };
  if (!userInfo.token) {
    router.push('/login?redirect=shipping');
  }
  if (!userShippingInfo.done) {
    router.push('/shipping');
  }
  return (
    <Layout title="place order" description="palce order">
      <StepperCpm stepLevel={3} steps={paymentSteps} />

      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <List>
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">shipping Address</Typography>
                  <Typography variant="body1">
                    {userShippingInfo.name}, {userShippingInfo.address},
                    {userShippingInfo.city}, {userShippingInfo.postalCode},
                    {userShippingInfo.country}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">Payment Method</Typography>
                  <Typography variant="body1">
                    {userSelectedPaymentMethod}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">Orders</Typography>
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartInfo.map((item) => {
                          return (
                            <TableRow
                              key={item.product._id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  width={50}
                                  height={50}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography>{item.product.name}</Typography>
                              </TableCell>
                              <TableCell>{item.count}</TableCell>
                              <TableCell>
                                <Typography>{item.product.price}</Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <List>
            <ListItem>
              <Card sx={{ width: '100%' }}>
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
                    onClick={clickHandler}
                  >
                    checkout
                  </Button>
                </CardActions>
              </Card>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default placeOrder;
