import './App.css'; // Importing the main CSS file for the app
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importing MUI's theming functionality
import PageSetUp from "./components/pageSetUp/PageSetUp"; // Importing the PageSetUp component
import { useDispatch } from "react-redux"; // Importing the useDispatch hook from react-redux for dispatching actions
import { useCallback, useContext, useEffect } from "react"; // Importing React hooks
import { initCatalog } from "./store/actions/metadataAction"; // Importing the initCatalog action
import useAuthentication from "./hooks/useAuthentication"; // Importing the custom authentication hook

// Creating a custom MUI theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5', // Primary color
		},
		secondary: {
			main: '#f50057', // Secondary color
		},
		disabled: {
			main: "#56595c", // Disabled state color
		}
	},
});

function App() {
	// Destructuring the AuthCtx from the custom authentication hook
	const { AuthCtx } = useAuthentication();
	// Extracting the accessToken from the authentication context
	const { accessToken } = useContext(AuthCtx);
	// Initializing the dispatch function from react-redux
	const dispatch = useDispatch();

	// useCallback hook to memoize the initPageData function
	const initPageData = useCallback(() => {
		// Dispatching the initCatalog action with the accessToken
		dispatch(initCatalog(accessToken));
	}, [dispatch, accessToken]); // Dependencies for useCallback

	// useEffect hook to initialize page data on component mount
	useEffect(() => {
		// Calling the memoized initPageData function
		initPageData();
	}, [initPageData]); // Dependencies for useEffect

	return (
		// Wrapping the application with the MUI ThemeProvider
		<ThemeProvider theme={theme}>
			{/* Rendering the PageSetUp component */}
			<PageSetUp />
		</ThemeProvider>
	);
}

export default App; // Exporting the App component as the default export
