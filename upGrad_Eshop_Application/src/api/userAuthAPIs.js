//APIs for User Authentication Process:

// Importing jwt_decode function from the jwt-decode library
import jwt_decode from "jwt-decode";

// Function for user login
export const doLogin = (email, password) => {

    // References for resolving and rejecting promises
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    // Creating a new Promise
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve; // Assigning resolve reference
        promiseRejectRef = reject;   // Assigning reject reference
    });

    // Making a POST request to the login endpoint
    fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
            username: email,    // User's email
            password: password, // User's password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8', // Specifying content type
        },
    }).then((response) => { // Handling response from server
        response.json().then((json) => { // Parsing response JSON
            if (response.ok) { // If response status is OK
                let token = response.headers.get("x-auth-token"); // Extracting JWT token from response header
                let decoded = jwt_decode(token); // Decoding JWT token to extract information
                // Resolving the promise with user data
                promiseResolveRef({
                    username: json.email,           // User's email
                    accessToken: token,             // JWT access token
                    accessTokenTimeout: decoded.exp * 1000, // Expiry time of access token (converted to epoch time)
                    roles: json.roles,              // User's roles
                    userId: json.id,                // User's ID
                    response: response,             // Original response from server
                });
            } else { // If response status is not OK
                // Rejecting the promise with error message
                promiseRejectRef({
                    reason: "Server error occurred. Please try again.",
                    response: response, // Original response from server
                });
            }
        }).catch((error) => { // Catching JSON parsing errors
            // Rejecting the promise with error message
            promiseRejectRef({
                reason: "Bad Credentials. Please try again.",
                response: error, // Error object
            });
        });
    }).catch((err) => { // Catching fetch errors
        // Rejecting the promise with error message
        promiseRejectRef({
            reason: "Some error occurred. Please try again.",
            response: err, // Error object
        });
    });

    // Returning the promise
    return promise;
};

// Function for user signup
export const doSignup = (requestJson) => {

    // References for resolving and rejecting promises
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    // Creating a new Promise
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve; // Assigning resolve reference
        promiseRejectRef = reject;   // Assigning reject reference
    });

    // Making a POST request to the signup endpoint
    fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(requestJson), // User signup data
        headers: {
            'Content-type': 'application/json; charset=UTF-8', // Specifying content type
        },
    }).then((response) => { // Handling response from server
        response.json().then((json) => { // Parsing response JSON
            if (response.ok) { // If response status is OK
                // Resolving the promise with success message
                promiseResolveRef({
                    message: json.message, // Success message from server
                    response: response,    // Original response from server
                });
            } else { // If response status is not OK
                let message = json.message; // Error message from server
                if (message === undefined || message === null) { // Checking if error message is defined
                    message = "Server error occurred. Please try again."; // Default error message
                }
                // Rejecting the promise with error message
                promiseRejectRef({
                    reason: message,       // Error message
                    response: response,    // Original response from server
                });
            }
        }).catch((err) => { // Catching JSON parsing errors
            // Rejecting the promise with error message
            promiseRejectRef({
                reason: "Some error occurred. Please try again.",
                response: err, // Error object
            });
        });
    }).catch((err) => { // Catching fetch errors
        // Rejecting the promise with error message
        promiseRejectRef({
            reason: "Some error occurred. Please try again.",
            response: err, // Error object
        });
    });

    // Returning the promise
    return promise;
};
