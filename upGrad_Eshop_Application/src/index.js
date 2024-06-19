import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering components
import './index.css'; // Importing global CSS styles
import App from './App'; // Importing the main App component
import reportWebVitals from './reportWebVitals'; // Importing the reportWebVitals function for performance monitoring
import { Provider } from "react-redux"; // Importing the Provider component from react-redux for connecting Redux store with React
import store from "./store"; // Importing the Redux store
import useAuthentication from "./hooks/useAuthentication"; // Importing the custom hook for authentication context
import useServices from "./hooks/useServices"; // Importing the custom hook for services context

// Defining a ConnectedApp component to wrap the App component with necessary providers
const ConnectedApp = () => {
    const { AuthProvider } = useAuthentication(); // Extracting AuthProvider from useAuthentication hook
    const { ServicesProvider } = useServices(); // Extracting ServicesProvider from useServices hook
    return (
        // Wrapping App component with AuthProvider and ServicesProvider to provide context values
        <AuthProvider>
            <ServicesProvider>
                {/* Wrapping App component with Redux Provider to make Redux store available */}
                <Provider store={store}>
                    <App />
                </Provider>
            </ServicesProvider>
        </AuthProvider>
    );
};

// Creating the root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Rendering the ConnectedApp component which includes all necessary providers
    <ConnectedApp />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Calling reportWebVitals function for performance monitoring
