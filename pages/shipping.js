import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addShipping } from '../utilities/slices/userSlice';
import Layout from '../cpm/Layout';
import StepperCpm from '../cpm/StepperCpm';
import PaymentSteps from '../utilities/PaymentSteps';
import {
  TextField,
  Box,
  List,
  ListItem,
  Button,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const Shipping = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.rootReducer.userState.info);
  const userShippingInfo = useSelector(
    (state) => state.rootReducer.userState.shipping
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ name, address, city, postalCode, country }) => {
    console.log({ name, address, city, postalCode, country });
    const done = true;
    dispatch(addShipping({ name, address, city, postalCode, country, done }));
    router.push('/payment');
  };
  if (!userInfo.token) {
    router.push('login?redirect=shipping');
    return;
  } else {
    return (
      <Layout title="shipping Address">
        <StepperCpm stepLevel={1} steps={PaymentSteps} />
        <Box
          component="form"
          autoComplete="off"
          sx={{ maxWidth: '60vw', margin: '0 auto' }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <List>
            <ListItem>
              <Typography variant="h2" component="h2">
                Shipping address
              </Typography>
            </ListItem>
            <ListItem>
              <Controller
                name="name"
                control={control}
                defaultValue={userShippingInfo.name || ''}
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="Full name"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'name should have more than 2 characters'
                          : 'name is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue={userShippingInfo.address || ''}
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field }) => (
                  <TextField
                    id="address"
                    label="address"
                    fullWidth
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'address is not valid'
                          : 'address is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue={userShippingInfo.city || ''}
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'city length is more than 3'
                          : 'city is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="postalCode"
                control={control}
                defaultValue={userShippingInfo.postalCode || ''}
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'Postal code length is more than 3'
                          : 'Postal code required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="country"
                control={control}
                defaultValue={userShippingInfo.country || ''}
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === 'minLength'
                          ? 'Country length is more than 3'
                          : 'Country required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
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
  }
};
export default Shipping;
