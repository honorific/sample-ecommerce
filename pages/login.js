import Layout from '../cpm/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setUserInfo } from '../utilities/slices/userSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Box,
  List,
  ListItem,
  Button,
  Typography,
} from '@mui/material';
const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.rootReducer.userState.info);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    console.log(email, password);
    const rawResponse = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const userInfo = await rawResponse.json();
    console.log(userInfo);
    if (userInfo.message) {
      alert(userInfo.message);
    } else {
      console.log(userInfo);
      dispatch(setUserInfo(userInfo));
      router.push(redirect || '/');
    }
  };
  return (
    <Layout title="Login">
      <Box
        component="form"
        autoComplete="off"
        sx={{ maxWidth: '60vw', margin: '0 auto' }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <List>
          <ListItem>
            <Typography variant="h2" component="h2">
              Login
            </Typography>
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
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
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
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Box>
    </Layout>
  );
};

export default Login;
