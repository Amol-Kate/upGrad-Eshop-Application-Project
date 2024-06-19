// Program for creating a Log in Webpage:

import Grid from "@mui/material/Grid"; // Import Grid component from Material-UI for layout
import Box from '@mui/material/Box'; // Import Box component from Material-UI for layout
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import LockOutlinedIcon component from Material-UI for the lock icon
import Typography from '@mui/material/Typography'; // Import Typography component from Material-UI for text
import TextField from '@mui/material/TextField'; // Import TextField component from Material-UI for text input
import Button from '@mui/material/Button'; // Import Button component from Material-UI for buttons
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress component from Material-UI for loading spinner
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop component from Material-UI for backdrop effect
import { useState, useContext, useEffect } from "react"; // Import useState, useContext, useEffect hooks from React
import { Navigate } from "react-router-dom"; // Import Navigate component from react-router-dom for navigation
import useAuthentication from "../../hooks/useAuthentication"; // Custom hook for authentication
import { useNavigate, useLocation } from "react-router-dom"; // Hooks for navigation
import useServices from "../../hooks/useServices"; // Custom hook for services

const Login = () => {
  let initialState = {
    username: {
      value: "",
      error: false,
      errorMessage: null,
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Please enter a valid password.",
    },
  };

  const [formData, setFormData] = useState(initialState); // State to manage form data
  const [busy, setBusy] = useState(false); // State to manage loading state
  const { AuthCtx } = useAuthentication(); // Authentication context
  const { login, loggedInUser } = useContext(AuthCtx); // Logged in user context
  const history = useNavigate(); // Navigation history
  const location = useLocation(); // Current location
  const { from } = (location && location.state) || { from: { pathname: "/home" } }; // Redirect path after login
  const { ServicesCtx } = useServices(); // Services context
  const { broadcastMessage } = useContext(ServicesCtx); // Function to broadcast messages

  useEffect(() => {
    loggedInUser && history(from, { replace: true }); // Redirect if user is already logged in
  }, [loggedInUser, from, history]);

  // Function to validate form data and perform login
  let validateAndLoginData = () => {
    setBusy(true); // Set loading state to true
    let data = { ...formData }; // Copy form data
    let requestJson = {}; // Object to store request data
    let validDetails = true; // Flag to track if all details are valid

    // Iterate through form data and validate each field
    for (let k in formData) {
      let json = getValidity(k, formData[k].value); // Get validity of current field
      data[k] = {
        value: data[k].value,
        error: !json.valid,
        errorMessage: json.message,
      };
      validDetails = validDetails && json.valid; // Update flag based on validity
      if (json.valid) {
        requestJson[k] = data[k].value; // Add valid field to request data
      }
    }
    setFormData(data); // Update form data
    if (validDetails) {
      // If all details are valid, perform login
      login(requestJson.username, requestJson.password)
        .then(() => {
          broadcastMessage("Login successful", "success"); // Broadcast success message
          setBusy(false); // Set loading state to false
        })
        .catch((json) => {
          broadcastMessage(json.reason, "error"); // Broadcast error message
          setBusy(false); // Set loading state to false
        });
    } else {
      setBusy(false); // Set loading state to false
    }
  };

  // Function to match value against regex pattern
  let matchRegex = (value, re) => {
    let regex = new RegExp(re);
    return regex.test(value);
  };

  // Function to get validity of a field
  let getValidity = (field, value) => {
    let valid = true;
    let message = null;
    if (value == null || value.length === 0) {
      valid = false;
      message = "This field is required.";
    } else {
      switch (field) {
        case "username": {
          if (value.length > 255) {
            valid = false;
            message = "Email can be of length 255 characters";
          } else {
            valid = matchRegex(
              value,
              "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
            );
            message = "Please enter a valid email.";
          }
          break;
        }
        case "password": {
          if (value.length < 6 || 40 < value.length) {
            valid = false;
            message = "Password's length must be between 6 and 40.";
          }
          break;
        }
        default: {
          return;
        }
      }
    }
    return {
      valid,
      message,
    };
  };

  // Function to validate and save form data on field change
  let validateAndSaveLoginData = (fieldName, fieldValue) => {
    let json = getValidity(fieldName, fieldValue);
    let data = { ...formData };
    data[fieldName] = {
      value: data[fieldName].value,
      error: !json.valid,
      errorMessage: json.message,
    };
    setFormData(data);
  };

  // Function to save form data on field change
  let saveOnFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        value,
      },
    });
  };

  if (loggedInUser === null) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10%",
                }}
              >
                <LockOutlinedIcon
                  style={{
                    display: "inline-block",
                    borderRadius: "60px",
                    padding: "0.6em 0.6em",
                    color: "#ffffff",
                    background: "#f50057",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{
                    fontSize: "25px",
                    color: "inherit",
                  }}
                >
                  Sign in
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <TextField
                  id="username"
                  label="Email Address *"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.username.value}
                  onChange={(event) =>
                    saveOnFieldChange("username", event.target.value)
                  }
                  onBlur={(event) =>
                    validateAndSaveLoginData("username", event.target.value)
                  }
                  error={formData.username.error}
                  helperText={
                    formData.username.error && formData.username.errorMessage
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <TextField
                  id="password"
                  label="Password *"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.password.value}
                  onChange={(event) =>
                    saveOnFieldChange("password", event.target.value)
                  }
                  onBlur={(event) =>
                    validateAndSaveLoginData("password", event.target.value)
                  }
                  error={formData.password.error}
                  helperText={
                    formData.password.error && formData.password.errorMessage
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={validateAndLoginData}
                >
                  SIGN IN
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginTop: "30px",
                }}
              >
                <Link to="/signup">
                  <Typography variant="body1">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </div>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={busy}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
