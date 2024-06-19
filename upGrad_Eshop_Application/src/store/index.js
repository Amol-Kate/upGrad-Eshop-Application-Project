// Import necessary functions and middleware from redux and redux-thunk libraries
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers"; // Import the root reducer which combines all reducers
import thunk from "redux-thunk"; // Import thunk middleware for handling asynchronous actions

// Create the Redux store
// createStore is a function that takes a reducer and returns a Redux store
// applyMiddleware is a function that adds middleware to the store
// thunk middleware allows us to write action creators that return a function instead of an action
const store = createStore(
  rootReducer, // The root reducer that combines all individual reducers
  applyMiddleware(thunk) // Apply thunk middleware to handle asynchronous actions
);

// Export the store as the default export from this module
export default store;
