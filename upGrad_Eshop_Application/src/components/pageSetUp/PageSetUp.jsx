// Program for setting up all the sub-components the webpages:

import Container from '@mui/material/Container'; // Import Container component from Material-UI
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"; // Import necessary routing components from react-router-dom
import Grid from '@mui/material/Grid'; // Import Grid component from Material-UI for layout
import Home from "../home/Home"; // Import Home component
import Login from "../login/Login"; // Import Login component
import SignUp from "../signup/SignUp"; // Import SignUp component
import Footer from "../footer/Footer"; // Import Footer component
import ErrorPage from "../errorPage/ErrorPage"; // Import ErrorPage component
import ProtectedRoute from "../protectedRoute/ProtectedRoute"; // Import ProtectedRoute component
import ProductPage from "../productPage/ProductPage"; // Import ProductPage component
import { createProduct, modifyProduct } from "../../api/productAPIs"; // Import API functions for creating and modifying products
import ProductDetails from "../productDetails/ProductDetails"; // Import ProductDetails component
import PlaceOrder from "../placeOrder/PlaceOrder"; // Import PlaceOrder component
import BroadcastMessage from "../broadcastMessage/BroadcastMessage"; // Import BroadcastMessage component
import NavigationBar from "../navigationBar/NavigationBar"; // Import NavigationBar component

const PageSetUp = () => {
  // Define the main setup component for page routing and layout

  return (
    <Router> {/* Router component to manage routing */}
      <NavigationBar /> {/* Include the NavigationBar component */}
      <Container maxWidth={false} sx={{ marginBottom: "30px", marginTop: "85px" }}> {/* Container for page content */}
        <Grid container spacing={2} sx={{ paddingTop: "24px" }}> {/* Grid container for organizing content */}
          <Routes> {/* Routes component to manage routing */}
            {/* Default route */}
            <Route
              path="/"
              element={<Navigate to="/home" />} // Redirect to the home page if the path is "/"
            />
            {/* Route for the home page */}
            <Route
              path="/home"
              element={ // Render the Home component inside a ProtectedRoute
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
            {/* Route for the login page */}
            <Route
              path="/login"
              element={<Login />} // Render the Login component
            />
            {/* Route for the signup page */}
            <Route
              path="/signup"
              element={<SignUp />} // Render the SignUp component
            />
            {/* Route for adding a new product */}
            <Route
              path="/product/add"
              element={ // Render the ProductPage component in "CREATE" mode inside a ProtectedRoute with role "ADMIN"
                <ProtectedRoute role={["ADMIN"]}>
                  <ProductPage
                    mode={"CREATE"}
                    buttonText="SAVE PRODUCT"
                    headingText="Add Product"
                    callbackFunction={createProduct}
                  />
                </ProtectedRoute>
              }
            />
            {/* Route for modifying an existing product */}
            <Route
              path="/product/modify"
              element={ // Render the ProductPage component in "MODIFY" mode inside a ProtectedRoute with role "ADMIN"
                <ProtectedRoute role={["ADMIN"]}>
                  <ProductPage
                    mode={"MODIFY"}
                    buttonText="MODIFY PRODUCT"
                    headingText="Modify Product"
                    callbackFunction={modifyProduct}
                  />
                </ProtectedRoute>
              }
            />
            {/* Route for viewing product details */}
            <Route
              path="/product/view"
              element={ // Render the ProductDetails component inside a ProtectedRoute
                <ProtectedRoute >
                  <ProductDetails	/>
                </ProtectedRoute>
              }
            />
            {/* Route for placing an order */}
            <Route
              path="/product/order"
              element={ // Render the PlaceOrder component inside a ProtectedRoute
                <ProtectedRoute >
                  <PlaceOrder	/>
                </ProtectedRoute>
              }
            />
            {/* Default route for handling unknown paths */}
            <Route
              path="*"
              element={<ErrorPage />} // Render the ErrorPage component
            />
          </Routes>
        </Grid>
      </Container>
      <Footer /> {/* Include the Footer component */}
      <BroadcastMessage /> {/* Include the BroadcastMessage component */}
    </Router>
  );
};

export default PageSetUp;
