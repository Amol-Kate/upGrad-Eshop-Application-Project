// Program for creating new options:

// Import necessary components and hooks from React and Material-UI
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from "react";

// Component for a selectable dropdown with the ability to add new options
const CreatableSelect = ({ ...props }) => {
  // Copy options from props and remove the first element
  let optionArray = [...props.options];
  optionArray.splice(0, 1);

  // Create filter options function from Autocomplete
  const filter = createFilterOptions();

  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(props.value || null);

  return (
    <Autocomplete
      value={selectedValue} // Value of the selected option
      onChange={(event, newValue) => {
        // If the new value starts with "Add ", extract the actual value
        if (newValue !== null && newValue.indexOf("Add ") === 0) {
          newValue = newValue.split("\"")[1];
        }
        setSelectedValue(newValue); // Update the selected value state
        props.onChange(newValue); // Call the onChange prop with the new value
      }}
      filterOptions={(options, params) => {
        // Filter options based on input parameters
        const filtered = filter(options, params);
        const { inputValue } = params;

        // Check if the input value is already an existing option
        const isExisting = options.some((option) => inputValue === option);

        // If the input value is not empty and not an existing option, suggest adding it
        if (inputValue !== '' && !isExisting) {
          filtered.push(`Add "${inputValue}"`);
        }
        return filtered; // Return the filtered options
      }}
      onBlur={() => {
        props.onBlur(selectedValue); // Call the onBlur prop with the selected value
      }}
      selectOnFocus // Select option on focus
      clearOnBlur // Clear input on blur
      handleHomeEndKeys // Handle Home and End keys
      id={props.id} // Set the id for the component
      options={optionArray} // Options to be displayed
      getOptionLabel={(option) => {
        // Customize the label of each option
        if (option.indexOf("Add ") === 0) {
          return option.split("\"")[1];
        }
        return option;
      }}
      renderOption={(props, option) => (
        <li {...props}>{option}</li> // Render each option as a list item
      )}
      sx={{ width: "100%" }} // Set the width of the component
      freeSolo // Allow free text input
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={props.label} // Set the label for the text field
          error={props.error} // Display error if present
          helperText={props.helperText} // Display helper text if present
        />
      )}
    />
  );
};

export default CreatableSelect;
