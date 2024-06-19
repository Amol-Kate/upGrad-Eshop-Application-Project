//APIs for order placement:

// Function to create an order using the provided request JSON and access token
export const createOrder = (requestJson, accessToken) => {
    // Initialize variables to hold references to the resolve and reject functions of the Promise
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    // Create a new Promise and save the resolve and reject function references
    let promise = new Promise((resolve, reject) => {
        // Store the resolve function reference in promiseResolveRef
        promiseResolveRef = resolve;
        // Store the reject function reference in promiseRejectRef
        promiseRejectRef = reject;
    });

    // Make a fetch request to the specified URL to create an order
    fetch('http://localhost:8080/api/orders', {
        method: 'POST', // HTTP method for creating a new resource
        body: JSON.stringify(requestJson), // Convert the requestJson object to a JSON string and set it as the request body
        headers: {
            'Content-type': 'application/json; charset=UTF-8', // Set the Content-type header to indicate JSON data
            'x-auth-token': accessToken, // Include the access token for authentication
        },
    })
    .then((response) => {
        // Parse the response body as text
        response.text().then(() => {
            if(response.ok) {
                // If the response is OK (status code 200-299), resolve the promise
                promiseResolveRef({
                    response: response, // Pass the response object to the resolve function
                });
            } else {
                // If the response is not OK, reject the promise with an error message and the response object
                promiseRejectRef({
                    reason: "Some error occurred. Please try again.", // Error message
                    response: response, // Pass the response object to the reject function
                });
            }
        });
    })
    .catch((err) => {
        // If an error occurs during the fetch request, reject the promise with an error message and the error object
        promiseRejectRef({
            reason: "Server error occurred. Please try again.", // Error message for server error
            response: err, // Pass the error object to the reject function
        });
    });

    // Return the promise to allow the caller to handle the resolution or rejection
    return promise;
};
