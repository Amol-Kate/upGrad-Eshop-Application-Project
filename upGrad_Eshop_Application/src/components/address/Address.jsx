// Address Component program for creating and selecting address to place the order:
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useCallback, useContext, useEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { createAddress, fetchAllAddresses } from "../../api/addressAPIs";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Address = ({ callbackFunction, address }) => {

  // Initial state for the address form fields with validation flags
  const initialState = {
    name: { value: "", error: false, errorMessage: null },
    contactNumber: { value: "", error: false, errorMessage: null },
    street: { value: "", error: false, errorMessage: null },
    city: { value: "", error: false, errorMessage: null },
    state: { value: "", error: false, errorMessage: null },
    landmark: { value: "", error: false, errorMessage: null },
    zipcode: { value: "", error: false, errorMessage: null },
  };

  // Determine if address is provided, if so extract the ID
  const selectedAddressId = address?.id || "";

  // State hooks to manage form data, selected address, loading state, etc.
  const [formData, setFormData] = useState(initialState);
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressId);
  const [busy, setBusy] = useState(false);
  const { AuthCtx } = useAuthentication();
  const { loggedInUserId, accessToken, isAccessTokenValid, logout } = useContext(AuthCtx);
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [showMessageLevel, setShowMessageLevel] = useState("error");

  // Function to hide and reset message
  const hideAndResetMessage = () => {
    setShowInfo(false);
    setShowMessage("");
    setShowMessageLevel("error");
  };

  // Function to validate and persist data
  const validateAndPersistData = () => {
    setBusy(true);
    const data = { ...formData };
    const requestJson = { user: loggedInUserId };
    let validAddress = true;

    // Validate each field in the form
    for (const key in formData) {
      const { valid, message } = getValidity(key, formData[key].value);
      data[key] = { ...data[key], error: !valid, errorMessage: message };
      validAddress = validAddress && valid;
      if (valid) {
        requestJson[key] = data[key].value;
      }
    }
    setFormData(data);

    // If all fields are valid, make API call to save the address
    if (validAddress) {
      if (isAccessTokenValid()) {
        createAddress(requestJson, accessToken)
          .then(() => {
            setShowInfo(true);
            setShowMessage("Address saved successfully.");
            setShowMessageLevel("success");
            setBusy(false);
            setFormData(initialState);
            initDropdown();
          })
          .catch((error) => {
            setShowInfo(true);
            setShowMessage(error.reason);
            setShowMessageLevel("error");
            setBusy(false);
          });
      } else {
        setShowInfo(true);
        setShowMessage("Session expired. Please login again!");
        setShowMessageLevel("info");
        logout().then(() => {
          navigate("/login");
        });
      }
    } else {
      setBusy(false);
    }
  };

  // Function to match value against a regex pattern
  const matchRegex = (value, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(value);
  };

  // Function to get validity of a field value
  const getValidity = (field, value) => {
    let valid = true;
    let message = null;

    // Validate based on field type
    if (!value && field !== "landmark") {
      valid = false;
      message = "This field is required.";
    } else {
      switch (field) {
        case "name":
          valid = value.length <= 255 && matchRegex(value, "^([A-Za-z\\s]+)$");
          message = valid ? null : "Please enter valid name.";
          break;
        case "contactNumber":
          valid = matchRegex(value, "^([7-9]{1}[0-9]{9})$");
          message = valid ? null : "Please enter valid contact number.";
          break;
        case "street":
        case "landmark":
          valid = value.length <= 255 && matchRegex(value, "^([A-Za-z0-9,/\\s\\-_@]+)$");
          message = valid ? null : `Please enter valid ${field}.`;
          break;
        case "city":
        case "state":
          valid = value.length <= 255 && matchRegex(value, "^([A-Za-z\\s]+)$");
          message = valid ? null : `Please enter valid ${field}.`;
          break;
        case "zipcode":
          valid = matchRegex(value, "^([1-9]{1}[0-9]{5})$");
          message = valid ? null : "Please enter valid zip code.";
          break;
        default:
          break;
      }
    }
    return { valid, message };
  };

  // Function to validate and save field value
  const validateAndSave = (field, value) => {
    const { valid, message } = getValidity(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], error: !valid, errorMessage: message },
    }));
  };

  // Function to handle form field value change
  const saveOnChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], value },
    }));
  };

  // Handle change event for address selection
  const handleChange = (event) => {
    setSelectedAddress(event.target.value);
    const selectedAddr = addressList.find((addr) => addr.id === event.target.value);
    callbackFunction(selectedAddr || null);
  };

  // Function to initialize the address dropdown by fetching addresses from API
  const initDropdown = useCallback(() => {
    if (isAccessTokenValid()) {
      fetchAllAddresses(accessToken)
        .then((response) => setAddressList(response.data))
        .catch(() => setAddressList([]));
    } else {
      setShowInfo(true);
      setShowMessage("Session expired. Please login again!");
      setShowMessageLevel("info");
      logout().then(() => navigate("/login"));
    }
  }, [accessToken, isAccessTokenValid, logout, navigate]);

  // useEffect to initialize the dropdown on component mount
  useEffect(() => {
    initDropdown();
  }, [initDropdown]);

  // JSX to render the Address form and dropdown
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ m: 1, width: "60%" }}>
                <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAddress}
                  label="Select Address"
                  onChange={handleChange}
                >
                  {(!addressList || addressList.length === 0) && (
                    <MenuItem disabled value="">
                      No address saved
                    </MenuItem>
                  )}
                  {addressList && addressList.length > 0 &&
                    addressList.map((element, index) => (
                      <MenuItem key={"sortBy_" + index} value={element.id}>
                        {`${element.name}, Contact Number: ${element.contactNumber}`}
                        <br />
                        {element.street}
                        {element.landmark && `, ${element.landmark}`}
                        <br />
                        {`${element.city}, ${element.state}, ${element.zipcode}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontSize: "15px", color: 'inherit' }}
              >
                OR
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container item spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontSize: "25px", color: 'inherit' }}
              >
                Add Address
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="name"
                label="Name *"
                variant="outlined"
                fullWidth
                value={formData.name.value}
                onChange={(event) => saveOnChange("name", event.target.value)}
                onBlur={(event) => validateAndSave("name", event.target.value)}
                error={formData.name.error}
                helperText={formData.name.error && formData.name.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="contactNumber"
                label="Contact Number *"
                variant="outlined"
                fullWidth
                value={formData.contactNumber.value}
                onChange={(event) => saveOnChange("contactNumber", event.target.value)}
                onBlur={(event) => validateAndSave("contactNumber", event.target.value)}
                error={formData.contactNumber.error}
                helperText={formData.contactNumber.error && formData.contactNumber.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="street"
                label="Street *"
                variant="outlined"
                fullWidth
                value={formData.street.value}
                onChange={(event) => saveOnChange("street", event.target.value)}
                onBlur={(event) => validateAndSave("street", event.target.value)}
                error={formData.street.error}
                helperText={formData.street.error && formData.street.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="city"
                label="City *"
                variant="outlined"
                fullWidth
                value={formData.city.value}
                onChange={(event) => saveOnChange("city", event.target.value)}
                onBlur={(event) => validateAndSave("city", event.target.value)}
                error={formData.city.error}
                helperText={formData.city.error && formData.city.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="state"
                label="State *"
                variant="outlined"
                fullWidth
                value={formData.state.value}
                onChange={(event) => saveOnChange("state", event.target.value)}
                onBlur={(event) => validateAndSave("state", event.target.value)}
                error={formData.state.error}
                helperText={formData.state.error && formData.state.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="landmark"
                label="Landmark"
                variant="outlined"
                fullWidth
                value={formData.landmark.value}
                onChange={(event) => saveOnChange("landmark", event.target.value)}
                onBlur={(event) => validateAndSave("landmark", event.target.value)}
                error={formData.landmark.error}
                helperText={formData.landmark.error && formData.landmark.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                id="zipcode"
                label="Zip Code *"
                variant="outlined"
                fullWidth
                value={formData.zipcode.value}
                onChange={(event) => saveOnChange("zipcode", event.target.value)}
                onBlur={(event) => validateAndSave("zipcode", event.target.value)}
                error={formData.zipcode.error}
                helperText={formData.zipcode.error && formData.zipcode.errorMessage}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={validateAndPersistData}
              >
                SAVE ADDRESS
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={busy}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showInfo}
        autoHideDuration={4000}
        onClose={hideAndResetMessage}
      >
        <Alert onClose={hideAndResetMessage} severity={showMessageLevel} sx={{ width: '100%' }}>
          {showMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Address;
