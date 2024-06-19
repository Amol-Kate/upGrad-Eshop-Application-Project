// program for fixed footer on all pages at the bottom of the page:

import "./Footer.css"; // Import the CSS file for footer styling
import Typography from '@mui/material/Typography'; // Import the Typography component from Material-UI

const Footer = () => (
    <footer className="footer">
        {/* Center align the content inside the footer */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2">
                {/* Display the copyright text and link to upGrad */}
                Copyright © <a href="https://www.upgrad.com/" target="_blank" rel="noopener noreferrer">upGrad</a> 2023.
            </Typography>
        </div>
    </footer>
);

export default Footer;
