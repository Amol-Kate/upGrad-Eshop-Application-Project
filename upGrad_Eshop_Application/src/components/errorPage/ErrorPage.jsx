// Program to reflect the error if user try to tries to access invalid url

// Import necessary components from Material-UI
import Grid from "@mui/material/Grid";
import LocationOffOutlinedIcon from '@mui/icons-material/LocationOffOutlined';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Functional component for displaying an error page
const ErrorPage = () => {
  return (
    // Box component to create a flex container with a flexible width
    <Box sx={{ flexGrow: 1 }}>
      {/* Grid container to create a grid layout with spacing */}
      <Grid container spacing={1}>
        {/* Nested grid container for centering the content */}
        <Grid container item spacing={3}>
          {/* Empty grid item to push the content to the center */}
          <Grid item xs={4} />
          
          {/* Grid item containing the error icon and message */}
          <Grid item xs={4}>
            {/* Div to center the icon and provide top margin */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
              {/* LocationOffOutlinedIcon component to display the error icon */}
              <LocationOffOutlinedIcon style={{
                display: 'inline-block', // Display as inline-block
                borderRadius: '60px', // Rounded corners
                padding: '0.6em 0.6em', // Padding around the icon
                color: '#ffffff', // White color for the icon
                background: "#f50057" // Red background color
              }} />
            </div>
            
            {/* Div to center the error message */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Typography component to display the error message */}
              <Typography
                variant="subtitle1" // Subtitle1 variant for the text
                noWrap // Prevent text from wrapping
                sx={{
                  fontSize: "25px", // Font size of the text
                  color: 'inherit', // Inherit color from parent
                }}
              >
                404 Not Found
              </Typography>
            </div>
          </Grid>
          
          {/* Empty grid item to push the content to the center */}
          <Grid item xs={4} />
        </Grid>
      </Grid>
    </Box>
  );
};

// Export the ErrorPage component as the default export
export default ErrorPage;
