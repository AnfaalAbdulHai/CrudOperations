import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tables from "../Components/Table";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(userData);

  return (
    <Box>
        <Typography sx={{ textAlign: "center", fontSize: "50px", marginLeft: "75vh", marginTop: 20}} variant="contained">
            Users
        </Typography>
      <Button
        onClick={() => navigate("/createUser")}
        sx={{ marginBottom: 5, float: "right", marginTop: 3 }}
        variant="contained"
      >
        Create new User
      </Button>
      <Tables data={userData} />
    </Box>
  );
};

export default Home;