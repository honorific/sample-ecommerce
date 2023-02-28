import Layout from '../cpm/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../utilities/slices/userSlice';
import {
  TextField,
  Box,
  List,
  ListItem,
  Button,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const Register = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.rootReducer.userState.info);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (confirmPassword === password) {
      const rawResponse = await fetch(
        'http://localhost:3000/api/users/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const userInfo = await rawResponse.json();
      if (userInfo.message) {
        alert(userInfo.message);
      } else {
        console.log(userInfo);
        dispatch(setUserInfo(userInfo));
        console.log('userState', userState);
      }
    }
  };
  return (
    <Layout title="Register">
      <Box
        component="form"
        autoComplete="off"
        sx={{ maxWidth: '60vw', margin: '0 auto' }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <List>
          <ListItem>
            <Typography variant="h2" component="h2">
              Register
            </Typography>
          </ListItem>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  id="name"
                  label="name"
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
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="email"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'email is not valid'
                        : 'email is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 3'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Password length is more than 3'
                        : 'Password is required'
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
              Register
            </Button>
          </ListItem>
        </List>
      </Box>
    </Layout>
  );
};

export default Register;
