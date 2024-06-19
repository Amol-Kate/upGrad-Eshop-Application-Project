// Program for home page/ landing page once the user log in:

import Grid from "@mui/material/Grid"; // Import the Grid component from Material-UI for layout
import useAuthentication from "../../hooks/useAuthentication"; // Import the custom hook for authentication
import { useContext } from "react"; // Import useContext from React for context management
import ProductCategory from "../productCategory/ProductCategory"; // Import the ProductCategory component
import Box from "@mui/material/Box"; // Import the Box component from Material-UI for layout
import ProductSorting from "../productSorting/ProductSorting"; // Import the ProductSorting component
import ProductListing from "../productListing/ProductListing"; // Import the ProductListing component

const Home = () => {
    const { AuthCtx } = useAuthentication(); // Use the custom authentication hook to get the AuthCtx context
    const { hasRole } = useContext(AuthCtx); // Destructure hasRole function from the AuthCtx context
    const mode = hasRole(["ADMIN"]) ? "EDIT" : "VIEW"; // Determine the mode based on the user's role

    return (
        <Box sx={{ flexGrow: 1 }}> {/* Box component with flexGrow property to allow expansion */}
            <Grid container spacing={1}> {/* Grid container with spacing between items */}
                <Grid container item spacing={3}> {/* Nested Grid container for nested items with spacing */}
                    <Grid item xs={12}> {/* Full-width Grid item */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the content */}
                            <ProductCategory /> {/* Render the ProductCategory component */}
                        </div>
                    </Grid>
                    <Grid item xs={12}> {/* Full-width Grid item */}
                        <div style={{ display: 'flex', justifyContent: 'left', paddingLeft: "1%" }}> {/* Left align the content with padding */}
                            <ProductSorting /> {/* Render the ProductSorting component */}
                        </div>
                    </Grid>
                    <ProductListing mode={mode} /> {/* Render the ProductListing component with the mode prop */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home; // Export the Home component as the default export
