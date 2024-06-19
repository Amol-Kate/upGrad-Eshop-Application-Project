// reportWebVitals.js

// Function to report web vitals metrics
// Accepts a callback function (onPerfEntry) to handle the metrics
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is defined and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each web vitals function and pass the onPerfEntry callback
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

// Export the reportWebVitals function as the default export
export default reportWebVitals;
