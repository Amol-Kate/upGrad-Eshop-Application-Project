// Program for variable Header/ top navigation bar of website to show different options after the used is logged in:

import Container from "@mui/material/Container"; // Import Container component from Material-UI for layout
import Toolbar from "@mui/material/Toolbar"; // Import Toolbar component from Material-UI for app bar styling
import { ShoppingCart } from "@mui/icons-material"; // Import ShoppingCart icon from Material-UI
import Typography from "@mui/material/Typography"; // Import Typography component from Material-UI for text
import Box from "@mui/material/Box"; // Import Box component from Material-UI for layout
import IconButton from "@mui/material/IconButton"; // Import IconButton component from Material-UI for icon buttons
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon component from Material-UI for menu icon
import Menu from "@mui/material/Menu"; // Import Menu component from Material-UI for menu
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem component from Material-UI for menu items
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import Logout from "../logout/Logout"; // Import Logout component for logout functionality
import AppBarSearch from "../appBarSearch/AppBarSearch"; // Import AppBarSearch component for search functionality
import Button from "@mui/material/Button"; // Import Button component from Material-UI for buttons
import AppBar from "@mui/material/AppBar"; // Import AppBar component from Material-UI for app bar styling
import { useContext, useState } from "react"; // Import useContext and useState hooks from React

import useAuthentication from "../../hooks/useAuthentication"; // Custom hook for authentication

const NavigationBar = () => {
  // State to manage anchor element for navigation menu
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Authentication context
  const { AuthCtx } = useAuthentication();
  const { loggedInUser, hasRole } = useContext(AuthCtx);

  // Array of pages with their details
  const pages = [
    {
      id: "1",
      label: "Home",
      url: "/home",
      visible: loggedInUser != null,
    },
    {
      id: "2",
      label: "Add Product",
      url: "/product/add",
      visible: loggedInUser != null && hasRole(["ADMIN"]),
    },
    {
      id: "3",
      label: "Login",
      url: "/login",
      visible: loggedInUser == null,
    },
    {
      id: "4",
      label: "Sign Up",
      url: "/signup",
      visible: loggedInUser == null,
    },
  ];

  // Function to handle opening navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Function to handle closing navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Render navigation bar
  return (
    <AppBar sx={{ bgcolor: "#3f51b5", position: 'fixed' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* Shopping cart icon */}
          <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* Brand name */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            upGrad E-Shop
          </Typography>
          {/* Menu icon for mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Navigation menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Map through pages and render menu items */}
              {pages.map((element) => {
                if (element.visible) {
                  return (
                    <MenuItem key={"menu_item_" + element.id} onClick={handleCloseNavMenu}>
                      <Link key={"link_" + element.id} to={element.url} style={{ textDecoration: "none" }}>
                        <Typography textAlign="center">{element.label}</Typography>
                      </Link>
                    </MenuItem>
                  );
                }
                return null;
              })}
              {/* Logout menu item */}
              {loggedInUser != null &&
                <MenuItem key="5" onClick={handleCloseNavMenu}>
                  <Logout />
                </MenuItem>
              }
            </Menu>
          </Box>
          {/* Shopping cart icon for mobile view */}
          <ShoppingCart sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          {/* Brand name for mobile view */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            upGrad E-Shop
          </Typography>
          {/* Search bar */}
          <Box sx={{ flexGrow: 1 }} />
          {loggedInUser != null && <AppBarSearch />}
          <Box sx={{ flexGrow: 1 }} />
          {/* Render buttons for main links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((element) => {
              if (element.visible) {
                return (
                  <Link key={"main_link_" + element.id} to={element.url} style={{ textDecoration: "none" }}>
                    <Button
                      key={"button_link_" + element.id}
                      sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}
                    >
                      <u>{element.label}</u>
                    </Button>
                  </Link>
                );
              }
              return null;
            })}
            {/* Logout button */}
            {loggedInUser != null &&
              <Logout sx={{ my: 2, ml: 2, color: 'white', display: 'block' }} />
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
