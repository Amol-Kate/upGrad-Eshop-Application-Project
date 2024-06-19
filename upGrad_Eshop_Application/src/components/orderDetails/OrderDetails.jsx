// Program to reflect order details before confirmation from user:

import { Card, CardContent, useTheme } from "@mui/material"; // Import necessary components from Material-UI
import Grid from "@mui/material/Grid"; // Import Grid component from Material-UI for layout
import Typography from "@mui/material/Typography"; // Import Typography component from Material-UI for text

const OrderDetails = ({ quantity, product, address }) => {
  // Access the current theme using useTheme hook from Material-UI
  const theme = useTheme();

  return (
    <Card style={{ width: "80%" }}>
      <CardContent>
        {/* Grid container for organizing content */}
        <Grid container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
          {/* Grid item for product details */}
          <Grid item xs={7} style={{ paddingRight: "1%" }}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <Grid container>
                {/* Product name */}
                <Grid item xs={12}>
                  <Typography variant={"h4"}>{product.name}</Typography>
                </Grid>
                {/* Quantity */}
                <Grid item xs={12} style={{ paddingTop: "2%" }}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Quantity: <b>{quantity}</b>
                  </Typography>
                </Grid>
                {/* Category */}
                <Grid item xs={12} style={{ paddingTop: "2%" }}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    category: <b>{product.category}</b>
                  </Typography>
                </Grid>
                {/* Product description */}
                <Grid item xs={12} style={{ paddingTop: "2%" }}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                      color: theme.palette.disabled.main,
                    }}
                  >
                    <em>{product.description}</em>
                  </Typography>
                </Grid>
                {/* Total price */}
                <Grid item xs={12} style={{ paddingTop: "2%" }}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "25px",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Total Price : &#8377; {product.price * quantity}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {/* Grid item for address details */}
          <Grid item xs={5}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <Grid container>
                {/* Heading for address details */}
                <Grid item xs={12}>
                  <Typography variant={"h4"}>Address Details :</Typography>
                </Grid>
                {/* Name */}
                <Grid item xs={12} style={{ paddingTop: "2%" }}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {address.name}
                  </Typography>
                </Grid>
                {/* Contact number */}
                <Grid item xs={12}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Contact Number: {address.contactNumber}
                  </Typography>
                </Grid>
                {/* Street, Landmark (if available), City */}
                <Grid item xs={12}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {address.landmark !== null ? (
                      <>
                        {address.street}, {address.landmark},{" "}
                        {address.city}
                      </>
                    ) : (
                      <>
                        {address.street}, {address.city}
                      </>
                    )}
                  </Typography>
                </Grid>
                {/* State */}
                <Grid item xs={12}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {address.state}
                  </Typography>
                </Grid>
                {/* Zip code */}
                <Grid item xs={12}>
                  <Typography
                    variant={"body1"}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {address.zipcode}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
