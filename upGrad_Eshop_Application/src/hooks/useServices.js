import { createContext, useState } from "react"; // Importing createContext and useState from React

// Creating services context
const ServicesCtx = createContext();

// Custom hook for displaying alert messages to users
const useServices = () => {
	// State variables for message and message level
	const [message, setMessage] = useState(null);
	const [level, setLevel] = useState(null);

	// Function to broadcast message with specified level
	const broadcastMessage = (messageBroadcast, messageLevel) => {
		setMessage(messageBroadcast);
		setLevel(messageLevel);
	};

	// Returning services context and provider
	return {
		ServicesCtx,
		ServicesProvider: ({ children }) => (
			<ServicesCtx.Provider value={{ message, level, broadcastMessage }}>
				{children}
			</ServicesCtx.Provider>
		),
	};
};

export default useServices; // Exporting useServices hook
