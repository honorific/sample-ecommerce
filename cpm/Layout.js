import Head from 'next/head';
import NextLink from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLight } from '../utilities/slices/themeSlice';
import { logoutUser } from '../utilities/slices/userSlice';
import { emptyCart } from '../utilities/slices/shopSlice';
import { useState } from 'react';

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Switch,
  CssBaseline,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

const Layout = ({ children, title, description }) => {
  const dispatch = useDispatch();
  title = description ? `ECM - ${description}` : 'ECM';

  let themeState = useSelector((state) => state.rootReducer.themeState.value);
  let totalCart = useSelector((state) => state.rootReducer.shopState.totalCart);
  let userInfo = useSelector((state) => state.rootReducer.userState.info);
  let mainTheme = createTheme({
    palette: {
      mode: themeState,
      primary: {
        main: '#455A64',
      },
      secondary: {
        main: '#FF9800',
      },
      BoxStyles: {
        css: {
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        },
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            marginBottom: '20px',
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          component: 'div',
        },
      },
    },
    shadows: [
      'none',
      '0px 15px 60px rgba(0, 0, 0, 0.15)',
      '0px 35px 60px rgba(0, 0, 0, 0.15)',
      '20px 55px 60px rgba(0, 0, 0, 0.15)',
      '10px 15px 60px rgba(0, 0, 0, 0.15)',
      ...Array(20).fill('none'),
    ],
  });
  mainTheme = responsiveFontSizes(mainTheme);

  const handleChange = () => {
    dispatch(toggleLight());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClose = () => {
    dispatch(logoutUser());
    dispatch(emptyCart());
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse',
          }}
        >
          <Switch
            onChange={handleChange}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'secondary.main',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'secondary.main',
              },
            }}
            checked={themeState === 'dark'}
          />
          {userInfo._id ? (
            <>
              <Button
                id="login-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="large"
                sx={{ color: '#fff', textTransform: 'lowercase' }}
              >
                {userInfo.name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOutClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <Link color="#fff" underline="hover" sx={{ marginRight: '1rem' }}>
                <Typography>Login</Typography>
              </Link>
            </NextLink>
          )}
          <NextLink href="/cart" passHref>
            <Link
              color="#fff"
              underline="hover"
              sx={{ marginLeft: 'auto', padding: '1rem' }}
            >
              <Badge badgeContent={totalCart} color="secondary">
                <Typography>Cart</Typography>
              </Badge>
            </Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link color="#fff" underline="hover">
              <Typography>ECM</Typography>
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
      <Container sx={{ minHeight: '80vh' }}>{children}</Container>
      <Typography
        sx={{
          backgroundColor: 'secondary.main',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          marginTop: '50px',
        }}
      >
        all right reserved
      </Typography>
    </ThemeProvider>
  );
};

export default Layout;
