import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import StepperCpm from '../../cpm/StepperCpm';
import paymentSteps from '../../utilities/PaymentSteps';
import Layout from '../../cpm/Layout';
import {
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { emptyCart } from '../../utilities/slices/shopSlice';
const Order = ({ data }) => {
  console.log(data);
  const info = data.data;
  const dispatch = useDispatch();
  const router = useRouter();
  const orderId = router.query.id;
  const payHandler = async () => {
    const rawBody = { isPaid: true };
    const rawResponse = await fetch(
      `http://localhost:3000/api/orders/${orderId}/update`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawBody),
      }
    );
    dispatch(emptyCart());
    const response = await rawResponse.json();
    console.log(response);
  };
  return (
    <Layout title="place order" description="palce order">
      <StepperCpm stepLevel={3} steps={paymentSteps} />
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6">shipping Address</Typography>
                <Typography variant="body1">
                  {info.address}, {info.city}, {info.country}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
          <ListItem>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6">Payment Method</Typography>
                <Typography variant="body1">{info.paymentMethod}</Typography>
              </CardContent>
            </Card>
          </ListItem>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={payHandler}
          >
            pay by {info.paymentMethod}
          </Button>
        </List>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(opt) {
  const orderId = opt.query.id;
  const orderData = await fetch(`http://localhost:3000/api/orders/${orderId}`);
  const response = await orderData.json();
  console.log(response);
  return {
    props: {
      data: response,
    },
  };
}

export default Order;
