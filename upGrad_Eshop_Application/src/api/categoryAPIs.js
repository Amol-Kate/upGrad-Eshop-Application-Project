// API for categories:

export const fetchAllCategories = (accessToken) => {
    // Declare references for promise resolve and reject functions
    let promiseResolveRef = null;
    let promiseRejectRef = null;
    
    // Create a new promise and assign the resolve and reject functions to the references
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    // Make a GET request to fetch product categories from the server
    fetch('http://localhost:8080/api/products/categories', {
        method: 'GET', // Specify the request method
        headers: {
            'x-auth-token': accessToken, // Include the access token in the headers for authentication
        },
    }).then((response) => {
        // Handle the response by converting it to JSON
        response.json().then((json) => {
            // Initialize an array to store the categories
            let arr = [];
            
            // Iterate through each category in the JSON response
            for(let i = 0; i < json.length; i++) {
                // Convert category to uppercase
                let c = json[i].toUpperCase();
                
                // Check if the category is not already in the array
                if(!arr.includes(c)) {
                    // Add the unique category to the array
                    arr.push(c);
                }
            }
            
            // Sort the array alphabetically
            arr.sort();
            
            // Add "ALL" as the first element in the array
            arr = ["ALL", ...arr];
            
            // If the response is OK (status code 200-299)
            if(response.ok) {
                // Resolve the promise with the sorted categories array and the response object
                promiseResolveRef({
                    data: arr,
                    response: response,
                });
            } else {
                // If the response is not OK, reject the promise with an error message and the response object
                promiseRejectRef({
                    reason: "Server error occurred.",
                    response: response,
                });
            }
        });
    }).catch((err) => {
        // If there is any error during the fetch request, reject the promise with an error message and the error object
        promiseRejectRef({
            reason: "Some error occurred.",
            response: err,
        });
    });
    
    // Return the promise
    return promise;
};
