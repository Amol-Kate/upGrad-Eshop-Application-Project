// Import the combineReducers function from the Redux library
import { combineReducers } from "redux";

// Import the metadataReducer which handles the state related to metadata
import metadataReducer from "./metadataReducer";

// Combine the metadataReducer into a single root reducer using combineReducers
// This will allow us to add more reducers in the future if needed
export default combineReducers({
  metadata: metadataReducer, // Key 'metadata' will correspond to the state slice managed by metadataReducer
});
