//Program for restricting access via procted route:

import { useContext } from "react"; // Importing useContext hook from React
import Login from "../login/Login"; // Importing Login component
import { Navigate } from "react-router-dom"; // Importing Navigate component from react-router-dom
import useAuthentication from "../../hooks/useAuthentication"; // Importing useAuthentication hook

// ProtectedRoute component
const ProtectedRoute = ({ role, children }) => {
	// Using useAuthentication hook to access authentication context
	const { AuthCtx } = useAuthentication();
	const { loggedInUser, hasRole } = useContext(AuthCtx); // Destructuring loggedInUser and hasRole from authentication context

	// Checking if user is logged in and has the required role
	if (loggedInUser !== null && hasRole(role)) {
		return children; // Render the children components
	} else {
		return <Navigate to={"/home"} />; // Redirect to home page if user is not logged in or does not have required role
	}
};

export default ProtectedRoute; // Exporting ProtectedRoute component
