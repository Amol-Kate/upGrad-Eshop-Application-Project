// Program for showing the list of all products:

import { useEffect, useState } from "react"; // Importing necessary hooks from React
import { connect } from "react-redux"; // Importing connect function from react-redux
import ProductCard from "../productCard/ProductCard"; // Importing ProductCard component
import Grid from "@mui/material/Grid"; // Importing Grid component from Material-UI
import Box from "@mui/material/Box"; // Importing Box component from Material-UI
import Button from "@mui/material/Button"; // Importing Button component from Material-UI
import Typography from "@mui/material/Typography"; // Importing Typography component from Material-UI
import { Modal, Backdrop, CircularProgress } from "@mui/material"; // Importing components from Material-UI
import { useNavigate, useSearchParams } from "react-router-dom"; // Importing hooks from react-router-dom
import useAuthentication from "../../hooks/useAuthentication"; // Importing custom hook useAuthentication
import useServices from "../../hooks/useServices"; // Importing custom hook useServices
import { initCatalog } from "../../store/actions/metadataAction"; // Importing action from metadataAction
import { deleteProduct, viewProduct } from "../../api/productAPIs"; // Importing API functions

const ProductListing = ({ mode, productList, sortBy, category, reFetchAllData }) => {
  const [deleteModal, setDeleteModal] = useState(false); // State to manage delete modal
  const [product, setProduct] = useState(null); // State to manage product details
  const [busy, setBusy] = useState(false); // State to manage loading state
  const { AuthCtx } = useAuthentication(); // Accessing Authentication context
  const { accessToken, isAccessTokenValid, logout } = useContext(AuthCtx); // Destructuring authentication context
  const { ServicesCtx } = useServices(); // Accessing Services context
  const { broadcastMessage } = useContext(ServicesCtx); // Accessing broadcastMessage function
  const navigate = useNavigate(); // Accessing navigate function from react-router-dom
  const [searchParams] = useSearchParams(); // Accessing search parameters
  const searchFor = searchParams.get("searchFor") || ""; // Initializing searchFor variable

  // Function to filter products based on search query
  const getFilteredProductsBasedOnQuery = (list, str) => {
    return str ? list.filter(item => item.name.toUpperCase().startsWith(str.toUpperCase())) : list;
  };

  // Function to sort products based on selected criteria
  const getSortedProducts = (list, s) => {
    return [...list].sort((a, b) => {
      if (s === "PRICE_ASC") return a.price - b.price;
      if (s === "PRICE_DESC") return b.price - a.price;
      // Sorting by "NEWEST" is not possible due to unavailability of creation or modification date
      return 0;
    });
  };

  // Function to filter products based on selected category
  const getFilteredProducts = (list, c) => {
    return c.toUpperCase() === "ALL" ? list : list.filter(item => item.category.toUpperCase() === c.toUpperCase());
  };

  // Function to initialize product deletion process
  const initiateDeleteProduct = details => {
    setProduct(details);
    setDeleteModal(true);
  };

  // Function to navigate to modify product page
  const initiateModifyProduct = details => {
    navigate("/product/modify", { state: JSON.stringify({ value: details }) });
  };

  // Function to view product details
  const initiateViewProduct = details => {
    if (isAccessTokenValid()) {
      setBusy(true);
      viewProduct(details.id, accessToken)
        .then(json => {
          navigate("/product/view", { state: JSON.stringify({ value: json.value }) });
          setBusy(false);
        })
        .catch(json => {
          broadcastMessage(json.reason, "error");
          setBusy(false);
        });
    } else {
      broadcastMessage("Session expired. Please login again!", "info");
      logout().then(() => {
        navigate("/login");
      });
    }
  };

  // Function to handle close of delete modal
  const handleClose = () => {
    setProduct(null);
    setDeleteModal(false);
  };

  // Function to proceed with product deletion
  const proceedDelete = () => {
    setBusy(true);
    setDeleteModal(false);
    if (isAccessTokenValid()) {
      deleteProduct(product.id, accessToken)
        .then(() => {
          broadcastMessage(`Product ${product.name} deleted successfully.`, "success");
          setBusy(false);
          setProduct(null);
          reFetchAllData(accessToken);
        })
        .catch(json => {
          broadcastMessage(json.reason, "error");
          setBusy(false);
          setProduct(null);
        });
    } else {
      broadcastMessage("Session expired. Please login again!", "info");
      logout().then(() => {
        navigate("/login");
      });
    }
  };

  // Filtering and sorting products based on search query, category, and sorting criteria
  let products = getFilteredProductsBasedOnQuery(getSortedProducts(getFilteredProducts(productList, category), sortBy), searchFor);

  return (
    <>
      <Grid container>
        {products.length > 0 ? (
          products.map((element, index) => (
            <Grid key={"parent_product_" + index} item xs={4}>
              <div key={"div_product_" + index} style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
                <ProductCard
                  key={"product_" + index}
                  mode={mode}
                  deleteProduct={initiateDeleteProduct}
                  modifyProduct={initiateModifyProduct}
                  buyProduct={initiateViewProduct}
                  {...element}
                />
              </div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body1">
                No products available.
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
      {/* Displaying delete modal if deleteModal state is true */}
      {deleteModal && (
        <Modal
          open={deleteModal}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3
            }}
          >
            <h2 id="parent-modal-title">Confirm deletion of product!</h2>
            <p id="parent-modal-description">
              Are you sure you want to delete the product?
            </p>
            {/* Button to cancel deletion */}
            <Button onClick={handleClose} variant={"outlined"} style={{ float: "right", marginLeft: 10 }}>Cancel</Button>
            {/* Button to proceed with deletion */}
            <Button onClick={proceedDelete} variant={"contained"} style={{ float: "right", marginLeft: 10 }}>Ok</Button>
          </Box>
        </Modal>
      )}
      {/* Displaying loading backdrop if busy state is true */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={busy}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

// Mapping state to props
const mapStateToProps = (state) => {
  return {
    productList: state.metadata.products,
    sortBy: state.metadata.selectedSortBy,
    category: state.metadata.selectedCategory,
  };
};

// Mapping dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    reFetchAllData: (accessToken) => dispatch(initCatalog(accessToken)),
  };
};

// Connecting component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
