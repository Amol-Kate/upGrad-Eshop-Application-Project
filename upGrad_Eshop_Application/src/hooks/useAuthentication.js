// Hooks for User Authentication:

import { createContext, useState } from "react"; // Importing createContext and useState from React
import { doLogin } from "../api/userAuthAPIs"; // Importing doLogin function from userAuthAPIs

// Creating authentication context
const AuthCtx = createContext();

// Custom hook for authentication purposes
const useAuthentication = () => {
	// Retrieving initial state from browser cache
	let initialState = localStorage.getItem("ecommerce_upgrad_logged_in_user_details");

	// Function to persist user details in browser cache
	let persistInCache = (json) => {
		// Updating initial state with user details
		initialState = {
			user: json.username,
			userId: json.userId,
			roles: json.roles,
			accessToken: json.accessToken,
			accessTokenTimeout: json.accessTokenTimeout,
		};
		// Saving updated state in browser cache
		localStorage.setItem("ecommerce_upgrad_logged_in_user_details", JSON.stringify(initialState));
	};

	// Function to clear user details from browser cache
	let clearCache = () => {
		// Resetting initial state
		initialState = {
			user: null,
			userId: null,
			roles: null,
			accessToken: null,
			accessTokenTimeout: null,
		};
		// Saving reset state in browser cache
		localStorage.setItem("ecommerce_upgrad_logged_in_user_details", JSON.stringify(initialState));
	};

	// Initializing initial state if not found in browser cache
	if (initialState === null || initialState === undefined) {
		initialState = {
			user: null,
			userId: null,
			roles: null,
			accessToken: null,
			accessTokenTimeout: null,
		};
	} else {
		initialState = JSON.parse(initialState);
		// Clearing cache if access token has expired
		if (initialState.accessTokenTimeout !== null && initialState.accessTokenTimeout < Date.now()) {
			clearCache();
		}
	}

	// State variables for user details and login error
	const [loggedInUser, setLoggedInUser] = useState(initialState.user);
	const [loggedInUserId, setLoggedInUserId] = useState(initialState.userId);
	const [roles, setRoles] = useState(initialState.roles);
	const [accessToken, setAccessToken] = useState(initialState.accessToken);
	const [accessTokenTimeout, setAccessTokenTimeout] = useState(initialState.accessTokenTimeout);
	const [loginError, setLoginError] = useState(null);

	// Function to handle user login
	const login = (email, password) => {
		let promiseResolveRef = null;
		let promiseRejectRef = null;
		let promise = new Promise((resolve, reject) => {
			promiseResolveRef = resolve;
			promiseRejectRef = reject;
		});
		doLogin(email, password)
			.then((json) => {
				// Updating state with user details
				setLoggedInUser(json.username);
				setLoggedInUserId(json.userId);
				setRoles(json.roles);
				setAccessToken(json.accessToken);
				setAccessTokenTimeout(json.accessTokenTimeout);
				setLoginError(null);
				// Persisting user details in cache
				persistInCache(json);
				promiseResolveRef(json);
			})
			.catch((json) => {
				// Handling login error
				setLoggedInUser(null);
				setLoggedInUserId(null);
				setRoles(null);
				setAccessToken(null);
				setAccessTokenTimeout(null);
				setLoginError(json.reason);
				promiseRejectRef(json);
			});
		return promise;
	};

	// Function to handle user logout
	const logout = () => {
		// Clearing user details from state and cache
		setLoggedInUser(null);
		setLoggedInUserId(null);
		setRoles(null);
		setAccessToken(null);
		setAccessTokenTimeout(null);
		setLoginError(null);
		clearCache();
		return new Promise((resolve) => {
			resolve();
		});
	};

	// Function to check if user has a specific role
	const hasRole = (roleArray) => {
		if (roleArray === undefined || roleArray === null) {
			return true;
		}
		if (initialState.roles !== null) {
			for (let i = 0; i < initialState.roles.length; i++) {
				for (let j = 0; j < roleArray.length; j++) {
					if (initialState.roles[i] === roleArray[j]) {
						return true;
					}
				}
			}
		}
		return false;
	};

	// Function to check if access token is still valid
	const isAccessTokenValid = () => {
		return !(accessTokenTimeout !== null && accessTokenTimeout < Date.now());
	};

	// Returning authentication context and provider
	return {
		AuthCtx,
		AuthProvider: ({ children }) => (
			<AuthCtx.Provider
				value={{
					loginError,
					loggedInUser,
					loggedInUserId,
					accessToken,
					accessTokenTimeout,
					roles,
					login,
					logout,
					hasRole,
					isAccessTokenValid,
				}}
			>
				{children}
			</AuthCtx.Provider>
		),
	};
};

export default useAuthentication; // Exporting useAuthentication hook
