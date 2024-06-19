// API to fetch all addresses from the server:

export const fetchAllAddresses = (accessToken) => {

    // References to the resolve and reject functions of the promise
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    // Create a new promise and store the resolve and reject functions in the references
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    // Make a GET request to the server to fetch all addresses
    fetch('http://localhost:8080/api/addresses', {
        method: 'GET', // HTTP method set to GET
        headers: {
            'x-auth-token': accessToken, // Include the access token in the request headers
        },
    })
    .then((response) => {
        // Parse the response JSON
        response.json().then((json) => {
            if(response.ok) {
                // If the response is successful, resolve the promise with the response data
                promiseResolveRef({
                    data: json,
                    response: response,
                });
            } else {
                // If the response is not successful, reject the promise with an error message
                promiseRejectRef({
                    reason: "Server error occurred.",
                    response: response,
                });
            }
        }).catch(() => {
            // If there is an error in parsing the response JSON, reject the promise
            promiseRejectRef({
                reason: "Some error occurred.",
                response: response,
            });
        });
    })
    .catch((err) => {
        // If there is an error in the fetch request itself, reject the promise
        promiseRejectRef({
            reason: "Some error occurred.",
            response: err,
        });
    });

    // Return the promise
    return promise;
};

// Function to create a new address on the server
export const createAddress = (requestJson, accessToken) => {

    // References to the resolve and reject functions of the promise
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    // Create a new promise and store the resolve and reject functions in the references
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    // Make a POST request to the server to create a new address
    fetch('http://localhost:8080/api/addresses', {
        method: 'POST', // HTTP method set to POST
        body: JSON.stringify(requestJson), // Convert the request JSON to a string and set it as the request body
        headers: {
            'Content-type': 'application/json; charset=UTF-8', // Set the content type of the request to JSON
            'x-auth-token': accessToken, // Include the access token in the request headers
        },
    })
    .then((response) => {
        // Parse the response text
        response.text().then((json) => {
            if(response.ok) {
                // If the response is successful, resolve the promise with a success message
                promiseResolveRef({
                    message: "Product " + requestJson.name + " added successfully.",
                    response: response,
                });
            } else {
                // If the response is not successful, extract the error message from the response
                let message = json.message;
                if(message === undefined || message === null) {
                    message = "Server error occurred. Please try again.";
                }
                // Reject the promise with the extracted or default error message
                promiseRejectRef({
                    reason: message,
                    response: response,
                });
            }
        }).catch(() => {
            // If there is an error in parsing the response text, reject the promise
            promiseRejectRef({
                reason: "Some error occurred.",
                response: response,
            });
        });
    })
    .catch((err) => {
        // If there is an error in the fetch request itself, reject the promise
        promiseRejectRef({
            reason: "Some error occurred. Please try again.",
            response: err,
        });
    });

    // Return the promise
    return promise;
};
