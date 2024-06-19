// program for creation of Sign-Up Page for registration of new users:

import Grid from "@mui/material/Grid"; // Importing Grid component from Material-UI
import Box from '@mui/material/Box'; // Importing Box component from Material-UI
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Importing LockOutlinedIcon component from Material-UI
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI.
import Button from '@mui/material/Button'; // Importing Button component from Material-UI
import { Link, Navigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import { useContext, useState } from "react"; // Importing useContext and useState hooks from React
import Backdrop from '@mui/material/Backdrop'; // Importing Backdrop component from Material-UI
import CircularProgress from '@mui/material/CircularProgress'; // Importing CircularProgress component from Material-UI
import { doSignup } from "../../api/userAuthAPIs"; // Importing doSignup function from userAuthAPIs
import useAuthentication from "../../hooks/useAuthentication"; // Importing useAuthentication hook
import useServices from "../../hooks/useServices"; // Importing useServices hook

// SignUp component
const SignUp = () => {
	// Initial state for form data
	let initialState = {
		firstName: {
			value: "",
			error: false,
			errorMessage: null,
		},
		lastName: {
			value: "",
			error: false,
			errorMessage: null,
		},
		email: {
			value: "",
			error: false,
			errorMessage: null,
		},
		password: {
			value: "",
			error: false,
			errorMessage: "Please enter a valid password.",
		},
		confirmPassword: {
			value: "",
			error: false,
			errorMessage: null,
		},
		contactNumber: {
			value: "",
			error: false,
			errorMessage: null,
		},
	};

	const [formData, setFormData] = useState(initialState); // State for form data
	const [busy, setBusy] = useState(false); // State for busy indicator
	const { ServicesCtx } = useServices(); // Using useServices hook to access services context
	const { broadcastMessage } = useContext(ServicesCtx); // Destructuring broadcastMessage from services context
	const { AuthCtx } = useAuthentication(); // Using useAuthentication hook to access authentication context
	const { loggedInUser } = useContext(AuthCtx); // Destructuring loggedInUser from authentication context

	// Function to validate and save form data
	let validateData = () => {
		setBusy(true); // Setting busy state to true
		let data = { ...formData }; // Copying form data
		let requestJson = {}; // Initializing request JSON object
		let valid = true; // Flag to track overall validity of form data

		// Iterating over form data fields
		for (let i in formData) {
			let json = getValidity(i, formData[i].value); // Getting validity status for each field
			data[i] = {
				value: data[i].value,
				error: !json.valid,
				errorMessage: json.message,
			}; // Updating form data with validity information
			valid = valid && json.valid; // Updating overall validity flag
			if (json.valid) {
				requestJson[i] = data[i].value; // Adding valid fields to request JSON
			}
		}

		setFormData(data); // Updating form data state

		// If form data is valid, perform signup
		if (valid) {
			doSignup(requestJson)
				.then((json) => {
					broadcastMessage(json.message, "success"); // Broadcasting success message
					setBusy(false); // Setting busy state to false
					setFormData(initialState); // Resetting form data
				})
				.catch((json) => {
					broadcastMessage(json.reason, "error"); // Broadcasting error message
					setBusy(false); // Setting busy state to false
				});
		} else {
			setBusy(false); // Setting busy state to false
		}
	};

	// Function to match value with regular expression
	let matchRegex = (value, re) => {
		let regex = new RegExp(re); // Creating regular expression object
		return regex.test(value); // Returning whether value matches the regular expression
	};

	// Function to validate field value
	let getValidity = (field, value) => {
		let valid = true; // Flag to track validity status
		let message = null; // Message to describe validation result

		// Checking if value is empty or null
		if (value == null || value.length === 0) {
			valid = false; // Setting validity flag to false
			message = "This field is required."; // Setting error message
		} else {
			// Switch case based on field name
			switch (field) {
				case "firstName": {
					if (value.length > 255) {
						valid = false; // Setting validity flag to false
						message = "First name can be of length 255 characters"; // Setting error message
					} else {
						valid = matchRegex(value, "^([A-Za-z]+)$"); // Checking if value matches regex
						message = "Please enter a valid first name."; // Setting error message
					}
					break;
				}
				case "lastName": {
					if (value.length > 255) {
						valid = false; // Setting validity flag to false
						message = "Last name can be of length 255 characters"; // Setting error message
					} else {
						valid = matchRegex(value, "^([A-Za-z]+)$"); // Checking if value matches regex
						message = "Please enter a valid last name."; // Setting error message
					}
					break;
				}
				case "email": {
					if (value.length > 255) {
						valid = false; // Setting validity flag to false
						message = "Email can be of length 255 characters"; // Setting error message
					} else {
						valid = matchRegex(
							value,
							"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
						); // Checking if value matches regex for email
						message = "Please enter a valid email."; // Setting error message
					}
					break;
				}
				case "password": {
					if (value.length < 6 || 40 < value.length) {
						valid = false; // Setting validity flag to false
						message = "Password's length must be between 6 and 40."; // Setting error message
					} else {
						valid = matchRegex(
							value,
							"^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,40}$"
						); // Checking if value matches regex for password
						message =
							"Password must contain at least one symbol (!@#$%^&*), one uppercase and lowercase letter, and one number."; // Setting error message
					}
					break;
				}
				case "confirmPassword": {
					valid = value.length > 0 && value === formData.password.value; // Checking if value matches password
					message = "Passwords do not match."; // Setting error message
					break;
				}
				case "contactNumber": {
					valid = matchRegex(value, "^([7-9]{1}[0-9]{9})$"); // Checking if value matches regex for contact number
					message = "Please enter a valid contact number."; // Setting error message
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
		}; // Returning validity status and message
	};

	// Function to validate and save field value in memory
	let validateAndSaveInMemory = (fieldName, value) => {
		let json = getValidity(fieldName, value);
		let data = {
			...formData
		};
		data[fieldName] = {
			value: data[fieldName].value,
			error: !json.valid,
			errorMessage: json.message,
		}
		setFormData(data);
	};

	let saveOnChange = (field, value) => {
		setFormData({
			...formData,
			[field]:{
				...formData[field],
				value
			}
		});
	};

	if(loggedInUser === null) {
		return (
			<Box sx={{flexGrow: 1}}>
				<Grid container spacing={1}>
					<Grid container item spacing={3}>
						<Grid item xs={4}/>
						<Grid item xs={4}>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "10%"}}>
								<LockOutlinedIcon style={{
									display: 'inline-block',
									borderRadius: '60px',
									padding: '0.6em 0.6em',
									color: '#ffffff',
									background: "#f50057"
								}}/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<Typography
									variant="subtitle1"
									noWrap
									sx={{
										fontSize: "25px",
										color: 'inherit',
									}}
								>
									Sign up
								</Typography>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="firstName"
										   label="First Name *"
										   variant="outlined"
										   fullWidth
										   value={formData.firstName.value}
										   onChange={(event) => saveOnChange("firstName", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("firstName", event.target.value)}
										   error={formData.firstName.error}
										   helperText={formData.firstName.error && formData.firstName.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="lastName"
										   label="Last Name *"
										   variant="outlined"
										   fullWidth
										   value={formData.lastName.value}
										   onChange={(event) => saveOnChange("lastName", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("lastName", event.target.value)}
										   error={formData.lastName.error}
										   helperText={formData.lastName.error && formData.lastName.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="email"
										   label="Email Address *"
										   variant="outlined"
										   fullWidth
										   type="email"
										   value={formData.email.value}
										   onChange={(event) => saveOnChange("email", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("email", event.target.value)}
										   error={formData.email.error}
										   helperText={formData.email.error && formData.email.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="password"
										   label="Password *"
										   variant="outlined"
										   fullWidth
										   type="password"
										   value={formData.password.value}
										   onChange={(event) => saveOnChange("password", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("password", event.target.value)}
										   error={formData.password.error}
										   helperText={formData.password.error && formData.password.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="confirmPassword"
										   label="Confirm Password *"
										   variant="outlined"
										   fullWidth
										   type="password"
										   value={formData.confirmPassword.value}
										   onChange={(event) => saveOnChange("confirmPassword", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("confirmPassword", event.target.value)}
										   error={formData.confirmPassword.error}
										   helperText={formData.confirmPassword.error && formData.confirmPassword.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<TextField id="contactNumber"
										   label="Contact Number *"
										   variant="outlined"
										   fullWidth
										   value={formData.contactNumber.value}
										   onChange={(event) => saveOnChange("contactNumber", event.target.value)}
										   onBlur={(event) => validateAndSaveInMemory("contactNumber", event.target.value)}
										   error={formData.contactNumber.error}
										   helperText={formData.contactNumber.error && formData.contactNumber.errorMessage}
								/>
							</div>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<Button variant="contained"
										color="primary"
										fullWidth
										onClick={validateData}
								>
									SIGN UP
								</Button>
							</div>
							<div style={{display: 'flex', justifyContent: 'right', marginTop: "30px"}}>
								<Link to="/login">
									<Typography variant="body1">
										Already have an account? Sign in
									</Typography>
								</Link>
							</div>
						</Grid>
						<Grid item xs={4}/>
					</Grid>
				</Grid>
				<Backdrop
					sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
					open={busy}
				>
					<CircularProgress color="inherit"/>
				</Backdrop>
			</Box>
		);
	} else {
		return (
			<Navigate to="/home"/>
		);
	}
};

export default SignUp;