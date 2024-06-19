// Program for creatig a Logout tab:

import Button from "@mui/material/Button"; // Import Button component from Material-UI
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom for navigation
import useAuthentication from "../../hooks/useAuthentication"; // Custom hook for authentication
import { useContext } from "react"; // Import useContext hook from React for context usage
import { clearAllMetadata } from "../../store/actions/metadataAction"; // Import action creator for clearing metadata
import { connect } from "react-redux"; // Import connect function from react-redux for connecting component to Redux store

// Logout component
const Logout = ({ sx, resetMetadata }) => {
  // Destructure props and assign default value to sx
  if (sx === null || sx === undefined) {
    sx = {};
  }

  const navigate = useNavigate(); // Get navigate function for navigation
  const { AuthCtx } = useAuthentication(); // Authentication context
  const { logout } = useContext(AuthCtx); // Logout function from authentication context

  // Function to perform logout
  let performLogout = () => {
    resetMetadata(); // Reset metadata
    logout().then(() => {
      navigate("/login"); // Navigate to login page after logout
    });
  };

  // Render logout button
  return (
    <Button
      sx={sx}
      variant="contained"
      color="secondary"
      onClick={() => performLogout()} // Call performLogout function on button click
    >
      LOGOUT
    </Button>
  );
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    sortBy: state.metadata.selectedSortBy, // Get selected sorting criteria from metadata
    category: state.metadata.selectedCategory, // Get selected category from metadata
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    resetMetadata: () => dispatch(clearAllMetadata()), // Dispatch action to clear metadata
  };
};

// Connect Logout component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
