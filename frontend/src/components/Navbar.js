import React from "react";
import Cookies from "js-cookie";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { BoxArrowRight } from "react-bootstrap-icons";
import user_pic from "../images/user.png";

const NavBar = withRouter(({ page = "not_dashboard", history }) => {
  const decoded_jwt = Cookies.get("jwt")
    ? jwt_decode(Cookies.get("jwt"))
    : null;

  return (
    <Navbar
      expand='lg'
      variant='light'
      bg={page === "not_dashboard" ? "white" : "light"}
    >
      <Container>
        <Navbar.Brand href='/'>LS Technology</Navbar.Brand>
        {page === "dashboard" && (
          <div>
            <Image
              rounded={true}
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                margin: "0 7px",
              }}
              src={
                decoded_jwt.profile_pic === ""
                  ? user_pic
                  : decoded_jwt.profile_pic
              }
            />
            <Navbar.Text href='#'>{decoded_jwt.firstName}</Navbar.Text>

            <BoxArrowRight
              style={{ cursor: "pointer", margin: "0 25px" }}
              size={22}
              onClick={() => {
                Cookies.remove("jwt");
                history.push("/");
              }}
            />
          </div>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
