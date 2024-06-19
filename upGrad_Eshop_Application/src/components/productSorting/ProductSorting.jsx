// Program for sorting of product depending on different criteria:

import { useState } from "react"; // Importing useState hook from React
import { FormControl, InputLabel, Select } from "@mui/material"; // Importing FormControl, InputLabel, and Select components from Material-UI
import MenuItem from "@mui/material/MenuItem"; // Importing MenuItem component from Material-UI
import { connect } from "react-redux"; // Importing connect function from react-redux
import { setSortBy } from "../../store/actions/metadataAction"; // Importing setSortBy action from metadataAction

// ProductSorting component
const ProductSorting = ({ selectedSortBy, saveSortBy }) => {
	// State to manage selected sorting option
	const [sortBy, setSortBy] = useState(selectedSortBy);

	// Function to handle change in sorting option
	const handleChange = (event) => {
		setSortBy(event.target.value); // Setting the selected sorting option
		saveSortBy(event.target.value); // Dispatching action to save sorting option in Redux store
	};

	// Sorting options
	const options = [
		{ label: "Default", value: "DEFAULT" },
		{ label: "Price high to low", value: "PRICE_DESC" },
		{ label: "Price low to high", value: "PRICE_ASC" },
		{ label: "Newest", value: "NEWEST" },
	];

	return (
		<FormControl sx={{ m: 1, minWidth: 240 }} size={"small"}>
			<InputLabel id="demo-simple-select-label">Sort By</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={sortBy}
				label="Sort By"
				onChange={handleChange}
			>
				{/* Mapping over options to render MenuItem components */}
				{options.map((element, index) => (
					<MenuItem key={"sortBy_" + index} value={element.value}>
						{element.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

// Mapping state to props
const mapStateToProps = (state) => ({
	selectedSortBy: state.metadata.selectedSortBy,
});

// Mapping dispatch to props
const mapDispatchToProps = (dispatch) => ({
	saveSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
});

// Connecting ProductSorting component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProductSorting);
