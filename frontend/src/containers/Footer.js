import { Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Typography variant="body2" bottom={ 0 } color="text.secondary" align="center" sx={{ my: 4 }} >
        {'Copyright © '}
        <Link color="inherit" href="https://pawel-stawikowski.pl/">
          Paweł Stawikowski
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

export default Footer;