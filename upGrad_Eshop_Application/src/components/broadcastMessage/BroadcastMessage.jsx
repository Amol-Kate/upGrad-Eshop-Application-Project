// Program for reflecting global broadcasting of messages:

// Import necessary hooks and components from React and Material-UI
import { useContext, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useServices from "../../hooks/useServices";

const BroadcastMessage = () => {
  // useState hook to manage the visibility of the Snackbar
  const [showInfo, setShowInfo] = useState(false);

  // Custom hook to access the services context
  const { ServicesCtx } = useServices();
  const { message, level, broadcastMessage } = useContext(ServicesCtx); // Destructure values from the context

  // useEffect hook to update the showInfo state based on the message and level values
  useEffect(() => {
    if (message === null || level === null) {
      setShowInfo(false); // Hide Snackbar if message or level is null
    } else {
      setShowInfo(true); // Show Snackbar if message and level are not null
    }
  }, [message, level]); // Dependency array includes message and level

  /**
   * Hide the Snackbar and reset the broadcast message
   */
  const hideAndResetMessage = () => {
    setShowInfo(false); // Hide the Snackbar
    broadcastMessage(null, null); // Reset the broadcast message and level in the context
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position of the Snackbar
      open={showInfo} // Control the visibility of the Snackbar
      autoHideDuration={4000} // Automatically hide the Snackbar after 4000ms
      onClose={hideAndResetMessage} // Handle close event
    >
      <Alert 
        onClose={hideAndResetMessage} // Handle close event for the Alert
        severity={level} // Set the severity level of the Alert
        sx={{ width: '100%' }} // Set the width of the Alert
      >
        {message} {/* Display the message */}
      </Alert>
    </Snackbar>
  );
};

export default BroadcastMessage;
