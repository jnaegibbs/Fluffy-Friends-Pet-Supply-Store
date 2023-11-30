import { Typography } from "@mui/material";
import { useState } from "react";
import { useGuestLoginMutation} from "../redux/authApi";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const GuestLogin = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [guestLogin, { error }] = useGuestLoginMutation();
  const password = "guestpassword";
  const submitRegister = async (event) => {
    console.log("submit clicked")
    event.preventDefault();
    const response = await guestLogin({
      username: email,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
    });
    setSuccess(response.data.message);

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");



//    navigate('/checkout')
  };


  const redirectToHomePage = () => {
    navigate("/");
  };

  const redirectToSomeOtherPage = () => {
    navigate("/some-other-page");
  };

  // Move the setFormSubmitted outside of the submitRegister function
  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  const styles = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 900,
    fontSize: "large",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
    paddingLeft: 10,
  };
  const bodyStyle = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 500,
    fontSize: "medium",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
    paddingLeft: 10,
  };

  const styles2 = {
    width: 500,
    maxWidth: "100%",
    paddingLeft: 10,
  };

  return (
    <div>
        <Box
          sx={{
            width: 500,
            border: "1px solid #F3EEEA",
            padding: 10,
            borderRadius: 10,
            m: "10% 20%",
          }}
        >
          <Typography
            fontFamily="monospace"
            variant="h4"
            align="left"
            gutterBottom
          >
            Login as Guest
          </Typography>
          <form onSubmit={(event) => {submitRegister(event); handleFormSubmit();}}>
            <TextField
              required
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <br />
            <br />

            <TextField
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <br />
            <br />
            <TextField
              required
              label="Mobile Number"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
            <br />
            <br />
            <TextField
              required
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
            <br />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#7071E8", padding: "10px 15px" }}
            >
              Login as Guest
            </Button>
          </form>
          {formSubmitted && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToHomePage}
              sx={{ marginRight: 2 }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToSomeOtherPage}
            >
              Other Page
            </Button>
          </div>
        )}
        </Box>
    </div>
  );
};

export default GuestLogin;