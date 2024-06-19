// Define the initial state for the reducer
let initialState = {
	selectedCategory: null, // The currently selected category for filtering products
	categories: [],         // Array to store all product categories
	products: [],           // Array to store all products
	selectedSortBy: "DEFAULT", // The selected sorting option, default is "DEFAULT"
  };
  
  // Define the reducer function which handles different actions to update the state
  const actionReducer = (state = initialState, action) => {
	let data; // Variable to hold the new state after applying an action
  
	// Use a switch statement to handle different action types
	switch (action.type) {
	  case "SET_FILTER": {
		// Update the state with the selected category for filtering products
		data = {
		  ...state, // Keep the existing state properties
		  selectedCategory: action.category, // Update selectedCategory with the action's category
		};
		break;
	  }
	  case "CLEAR_FILTER": {
		// Clear the selected category for filtering products
		data = {
		  ...state, // Keep the existing state properties
		  selectedCategory: null, // Reset selectedCategory to null
		};
		break;
	  }
	  case "SET_SORTING": {
		// Update the state with the selected sorting option
		data = {
		  ...state, // Keep the existing state properties
		  selectedSortBy: action.sortBy, // Update selectedSortBy with the action's sortBy
		};
		break;
	  }
	  case "INIT_CATALOG": {
		// Initialize the catalog by setting categories and products from the action payload
		data = {
		  ...state, // Keep the existing state properties
		  categories: action.categories, // Update categories with the action's categories
		  products: action.products,     // Update products with the action's products
		};
		break;
	  }
	  case "CLEAR_ALL": {
		// Clear all state properties by resetting to the initial state
		data = initialState; // Set state to initialState
		break;
	  }
	  default: {
		// If the action type is not recognized, return the current state unchanged
		data = state; // Keep the existing state
	  }
	}
  
	// Save the updated state to localStorage for persistence
	localStorage.setItem("ecommerce_upgrad_metadata", JSON.stringify(data));
  
	// Return the updated state
	return data;
  };
  
  // Export the reducer as the default export
  export default actionReducer;
  