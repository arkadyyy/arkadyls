import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/utils";
import axios from "axios";
import user_pic from "../../images/user.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { languageChange } from "../../Redux/action";
import "./SignIn.css";
import NavBar from "../../components/Navbar";
import { signText } from "../../utils/utils";
import FormComponent from "./Form";
const SignIn = withRouter(({ history }) => {
  const dir = useSelector((state) => state.dir);
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [displayError, setdisplayError] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const [language, setlanguage] = useState("EN");

  const responseFacebook = (res) => {
    console.log(res);

    const data = {
      email: res.email,
      password: res.userID,
      firstName: res.name.split(" ")[0],
      lastName: res.name.split(" ")[1],
      image: res.picture.data.url,
    };
    axios
      .post(`${BASE_API_URL}/facebook_sign_in`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => {
        setdisplayError(true);
        seterrMsg(err.message);
      });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    axios
      .post(`${BASE_API_URL}/sign_in`, data, {
        withCredentials: true,
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => {
        setdisplayError(true);
        seterrMsg(err.message);
      });
  };
  const handleLanguageChange = (language) => {
    const dir = language === "EN" ? "ltr" : "rtl";
    setlanguage(language);
    dispatch(languageChange(dir));
  };

  const onEmailChange = (e) => {
    setemail(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setdisplayError(false);
      seterrMsg("");
    }, 4700);
  }, [displayError]);

  return (
    <>
      <NavBar />

      <div dir={dir} className='signInContainer'>
        <div>
          <Form.Select
            value={language}
            style={{
              position: "relative",
              top: "10rem",
              left: "19rem",
              padding: "0.3rem",
            }}
            aria-label='EN'
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value='EN'>EN</option>
            <option value='HE'>HE</option>
          </Form.Select>{" "}
        </div>
        {displayError ? (
          <Alert className='alert-fixed' variant={"danger"}>
            {errMsg}
          </Alert>
        ) : null}

        <h2 style={{ marginTop: "1rem", marginBottom: "5rem" }}>
          {signText[language]["signIn"]["header"]}
        </h2>

        <Card
          style={{ padding: "1rem 10rem", margin: "2rem", height: "800px" }}
        >
          <img src={user_pic} className='sign_in_pic'></img>
          <Card.Body>
            <Form
              onSubmit={(e) => handleSubmit(e, { email, password })}
              style={{
                width: "300px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {[
                {
                  type: "Email",
                  value: email,
                  setValue: setemail,
                },
                {
                  type: "Password",
                  value: password,
                  setValue: setpassword,
                },
              ].map((obj, id) => (
                <FormComponent key={id} {...obj} language={language} />
              ))}

              <Button variant='primary' className='m-2' type='submit'>
                {signText[language]["signIn"]["header"]}
              </Button>
              <FacebookLogin
                size={"small"}
                // appId={process.env.REACT_APP_FACEBOOK_ACCESS_KEY}
                appId={"309075364038210"}
                fields='name,email,picture'
                callback={responseFacebook}
              />
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {signText[language]["signIn"]["forgotPassword"]}
              </p>
            </Form>
          </Card.Body>
        </Card>
        <p> {signText[language]["signIn"]["signUpText"]}</p>
        <a
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => history.push("/sign_up")}
        >
          {signText[language]["signIn"]["signUp"]}
        </a>
      </div>
    </>
  );
});

export default SignIn;
