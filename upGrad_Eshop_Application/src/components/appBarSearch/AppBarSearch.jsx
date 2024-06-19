// Program for Searching products by it's name after logging in:

// Import necessary modules from Material-UI and React
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { alpha, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const AppBarSearch = () => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // useSearchParams hook to get the current URL search parameters
  const [searchParams] = useSearchParams();

  // useState hook to manage the state of the search input
  const [searchFor, setSearchFor] = useState(searchParams.get("searchFor") || "");

  /**
   * Update the searchFor state with the new value
   * @param {string} val - New value for the search input
   */
  const changeVal = (val) => {
    setSearchFor(val);
  }

  /**
   * Handle blur event and navigate to the appropriate URL based on the input value
   * @param {string} val - Current value of the search input
   */
  const blurVal = (val) => {
    if (val !== null && val.length > 0) {
      // If input is not empty, navigate to /home with search parameter
      navigate(`/home?searchFor=${val}`);
    } else {
      // If input is empty, navigate to /home without search parameter
      navigate("/home");
    }
  }

  return (
    <FormControl variant="outlined" style={{ width: "33%" }}>
      <OutlinedInput
        id="search"
        value={searchFor} // Bind searchFor state to the input value
        onChange={(event) => changeVal(event.target.value)} // Handle input change event
        onBlur={(event) => blurVal(event.target.value)} // Handle input blur event
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            blurVal(event.target.value); // Handle Enter key press
          }
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#FFFFFF" }} /> {/* Search icon at the start of the input */}
          </InputAdornment>
        }
        aria-describedby="search"
        placeholder="Search..."
        inputProps={{
          'aria-label': 'search',
        }}
        size="small"
        sx={{
          color: "#FFFFFF", // Text color
          borderRadius: 2, // Border radius
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15), // Initial background color with alpha
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25), // Background color on hover with alpha
          },
          width: "100%" // Input width
        }}
      />
    </FormControl>
  );
};

export default AppBarSearch;
