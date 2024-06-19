import { fetchAllProducts } from "../../api/productAPIs"; // Importing fetchAllProducts API
import { fetchAllCategories } from "../../api/categoryAPIs"; // Importing fetchAllCategories API

/**
 * Action creator for setting product filter based on selected category
 * @param {string} category - The category to filter products by
 * @returns {Object} Action object with type "SET_FILTER" and category
 */
export const setFilter = (category) => {
	return {
		type: "SET_FILTER",
		category: category,
	};
};

/**
 * Action creator for clearing the product filter
 * @returns {Object} Action object with type "CLEAR_FILTER"
 */
export const clearFilter = () => {
	return {
		type: "CLEAR_FILTER",
	};
};

/**
 * Thunk action creator for initializing the product catalog
 * Fetches all categories and products, then dispatches INIT_CATALOG action
 * @param {string} accessToken - Access token for API authentication
 * @returns {Function} Thunk function that dispatches an action based on API response
 */
export const initCatalog = (accessToken) => (dispatch) => {
	// Fetch categories and products concurrently
	Promise.all([fetchAllCategories(accessToken), fetchAllProducts(accessToken)])
		.then((json) => {
			// Dispatch INIT_CATALOG action with fetched categories and products
			dispatch({
				type: "INIT_CATALOG",
				categories: json[0].data,
				products: json[1].data,
			});
		})
		.catch(() => {
			// Dispatch INIT_CATALOG action with default values in case of an error
			dispatch({
				type: "INIT_CATALOG",
				categories: ["ALL"],
				products: [],
			});
		});
};

/**
 * Action creator for setting the sorting order of products
 * @param {string} sortBy - The sorting order (e.g., "PRICE_ASC", "PRICE_DESC")
 * @returns {Object} Action object with type "SET_SORTING" and sortBy
 */
export const setSortBy = (sortBy) => {
	return {
		type: "SET_SORTING",
		sortBy: sortBy,
	};
};

/**
 * Action creator for clearing all metadata (filters and sorting)
 * @returns {Object} Action object with type "CLEAR_ALL"
 */
export const clearAllMetadata = () => {
	return {
		type: "CLEAR_ALL",
	};
};
