// Program for the web page which shows all the product details while placing order

import Grid from "@mui/material/Grid";  // Import Grid component from Material-UI for layout
import Typography from "@mui/material/Typography";  // Import Typography component from Material-UI for text
import {Card, CardContent, useTheme} from "@mui/material";  // Import Card, CardContent, and useTheme components from Material-UI

const ItemDetail = ({productQuantity, selectedProduct}) => {

	const theme = useTheme();  // Use the theme hook to access the theme properties

	return (
		<Card style={{width: "80%"}}>
			<CardContent>
				<Grid container style={{paddingTop: "5%", paddingBottom: "5%"}}>
					<Grid item xs={4}/>
					<Grid item xs={4}>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<Grid container>
								<Grid item xs={12}>
									<Typography variant={"h4"}>
										{selectedProduct.name}
									</Typography>
								</Grid>
								<Grid item xs={12} style={{paddingTop: "2%"}}>
									<Typography
										variant={"body1"}
										style={{
											fontSize: "15px",
										}}
									>
										Quantity: <b>{productQuantity}</b>
									</Typography>
								</Grid>
								<Grid item xs={12} style={{paddingTop: "2%"}}>
									<Typography
										variant={"body1"}
										style={{
											fontSize: "15px",
										}}
									>
										category: <b>{selectedProduct.category}</b>
									</Typography>
								</Grid>
								<Grid item xs={12} style={{paddingTop: "2%"}}>
									<Typography
										variant={"body1"}
										style={{
											fontSize: "15px",
											color: theme.palette.disabled.main,
										}}
									>
										<em>{selectedProduct.description}</em>
									</Typography>
								</Grid>
								<Grid item xs={12} style={{paddingTop: "2%"}}>
									<Typography
										variant={"body1"}
										style={{
											fontSize: "25px",
											color: theme.palette.secondary.main,
										}}
									>
										Total Price : &#8377; {selectedProduct.price * productQuantity}
									</Typography>
								</Grid>
							</Grid>
						</div>
					</Grid>
					<Grid item xs={4}/>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default ItemDetail;  // Export the ItemDetail component as the default export