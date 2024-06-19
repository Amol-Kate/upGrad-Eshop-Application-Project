//APIs for product & listing:

// Function to fetch all products from the API
export const fetchAllProducts = (accessToken) => {
	// References to hold the resolve and reject functions of the promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Creating a new promise that will be resolved or rejected based on the fetch operation
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Making a GET request to fetch all products
	fetch('http://localhost:8080/api/products', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken, // Attaching the access token for authentication
		},
	}).then((response) => {
		// Parsing the response as JSON
		response.json().then((json) => {
			// If the response is successful (status code 200-299)
			if(response.ok) {
				// Resolving the promise with the response data
				promiseResolveRef({
					data: json,
					response: response,
				});
			} else {
				// Rejecting the promise with an error message
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// If there is an error in the fetch operation, rejecting the promise
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});

	// Returning the promise to the caller
	return promise;
};

// Function to create a new product in the API
export const createProduct = (requestJson, accessToken) => {
	// References to hold the resolve and reject functions of the promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Creating a new promise that will be resolved or rejected based on the fetch operation
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Making a POST request to create a new product
	fetch('http://localhost:8080/api/products', {
		method: 'POST',
		body: JSON.stringify(requestJson), // Converting the product data to JSON format
		headers: {
			'Content-type': 'application/json; charset=UTF-8', // Setting the content type to JSON
			'x-auth-token': accessToken, // Attaching the access token for authentication
		},
	}).then((response) => {
		// Parsing the response as text
		response.text().then((json) => {
			// If the response is successful (status code 200-299)
			if(response.ok) {
				// Resolving the promise with a success message
				promiseResolveRef({
					message: "Product " + requestJson.name + " added successfully.",
					response: response,
				});
			} else {
				// Extracting the error message from the response
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				// Rejecting the promise with the error message
				promiseRejectRef({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		// If there is an error in the fetch operation, rejecting the promise
		promiseRejectRef({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});

	// Returning the promise to the caller
	return promise;
};

// Function to delete a product by ID from the API
export const deleteProduct = (id, accessToken) => {
	// References to hold the resolve and reject functions of the promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Creating a new promise that will be resolved or rejected based on the fetch operation
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Making a DELETE request to remove the product by ID
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'DELETE',
		headers: {
			'x-auth-token': accessToken, // Attaching the access token for authentication
		},
	}).then((response) => {
		// Parsing the response as text
		response.text().then(() => {
			// If the response is successful (status code 200-299)
			if(response.ok) {
				// Resolving the promise indicating successful deletion
				promiseResolveRef({
					response: response,
				});
			} else {
				// Rejecting the promise with an error message
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// If there is an error in the fetch operation, rejecting the promise
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});

	// Returning the promise to the caller
	return promise;
};

// Function to modify an existing product in the API
export const modifyProduct = (requestJson, accessToken) => {
	// References to hold the resolve and reject functions of the promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Creating a new promise that will be resolved or rejected based on the fetch operation
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Making a PUT request to modify the product
	fetch('http://localhost:8080/api/products/' + requestJson.id, {
		method: 'PUT',
		body: JSON.stringify(requestJson), // Converting the product data to JSON format
		headers: {
			'Content-type': 'application/json; charset=UTF-8', // Setting the content type to JSON
			'x-auth-token': accessToken, // Attaching the access token for authentication
		},
	}).then((response) => {
		// Parsing the response as text
		response.text().then((json) => {
			// If the response is successful (status code 200-299)
			if(response.ok) {
				// Resolving the promise with a success message
				promiseResolveRef({
					message: "Product " + requestJson.name + " modified successfully.",
					response: response,
				});
			} else {
				// Extracting the error message from the response
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				// Rejecting the promise with the error message
				promiseRejectRef({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		// If there is an error in the fetch operation, rejecting the promise
		promiseRejectRef({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});

	// Returning the promise to the caller
	return promise;
};

// Function to view a product by ID from the API
export const viewProduct = (id, accessToken) => {
	// References to hold the resolve and reject functions of the promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Creating a new promise that will be resolved or rejected based on the fetch operation
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Making a GET request to fetch the product by ID
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken, // Attaching the access token for authentication
		},
	}).then((response) => {
		// Parsing the response as JSON
		response.json().then((json) => {
			// If the response is successful (status code 200-299)
			if(response.ok) {
				// Resolving the promise with the product data
				promiseResolveRef({
					value: json,
					response: response,
				});
			} else {
				// Rejecting the promise with an error message
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// If there is an error in the fetch operation, rejecting the promise
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});

	// Returning the promise to the caller
	return promise;
};
