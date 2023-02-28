import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Layout from '../cpm/Layout';
import PaymentSteps from '../utilities/PaymentSteps';
import StepperCpm from '../cpm/StepperCpm';
import { userPaymentMethod } from '../utilities/slices/userSlice';
import {
  FormControl,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  List,
  ListItem,
  Button,
} from '@mui/material';
const payment = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.rootReducer.userState.info);
  const userSelectedPaymentMethod = useSelector(
    (state) => state.rootReducer.userState.paymentMethod
  );

  const userShippingInfo = useSelector(
    (state) => state.rootReducer.userState.shipping
  );
  if (!userInfo.token) {
    router.push('/login?redirect=shipping');
  }
  if (!userShippingInfo.done) {
    router.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState(
    userSelectedPaymentMethod || ''
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(userPaymentMethod(paymentMethod));
    router.push('/place-order');
  };
  const backHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Payment method">
      <StepperCpm stepLevel={2} steps={PaymentSteps} />
      <Box
        component="form"
        autoComplete="off"
        sx={{ maxWidth: '60vw', margin: '50px auto 0 auto' }}
        onSubmit={submitHandler}
      >
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <Typography component="h3" variant="h3">
                Payment Method
              </Typography>
              <RadioGroup
                name="payment_Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="Paypal"
                />
                <FormControlLabel
                  value="stripe"
                  control={<Radio />}
                  label="Stripe"
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth variant="outlined" onClick={backHandler}>
              back
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              continue
            </Button>
          </ListItem>
        </List>
      </Box>
    </Layout>
  );
};

export default payment;
