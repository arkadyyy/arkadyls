import React, { useEffect, useState, useRef } from "react";
import "./SignUp.css";
import user from "../../images/user.png";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { withRouter, Redirect } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import NavBar from "../../components/Navbar";
import { signText, BASE_API_URL } from "../../utils/utils";
import { languageChange } from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import FormComponent from "./Form";
const SignUp = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const dir = useSelector((state) => state.dir);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordRe, setpasswordRe] = useState("");

  const [showErr, setshowErr] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const [image, setimage] = useState(null);
  const [language, setlanguage] = useState("EN");

  const [displayImageLoader, setdisplayImageLoader] = useState(false);
  const [displayPass, setdisplayPass] = useState({
    Password: false,
    RetypePassword: false,
  });

  const inputUpdateAvatarPhoto = useRef(null);

  useEffect(() => {
    if (showErr === true) {
      setTimeout(() => {
        setshowErr(false);
        seterrMsg("");
      }, 2000);
    }
  }, [showErr]);

  const checkFieldsFilled = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordRe === ""
    ) {
      setshowErr(true);
      seterrMsg("please fill all fields");
      return false;
    } else {
      return true;
    }
  };

  const checkPasswordMatch = (e) => {
    e.preventDefault();
    if (password === passwordRe) {
      return true;
    } else {
      setshowErr(true);
      seterrMsg("passwords do not match");
      return false;
    }
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();

    axios
      .post(`${BASE_API_URL}/sign_up`, data, {
        withCredentials: true,
        "Content-Type": "application/json",
      })
      .then((res) => {
        history.push("/sign_in");
      })
      .catch((err) => {
        seterrMsg(err.message);
        setshowErr(true);
      });
  };

  const imageUpload = () => {
    const image = inputUpdateAvatarPhoto.current?.files[0];
    setdisplayImageLoader(true);
    axios.get(`${BASE_API_URL}/s3_url`).then(async (res) => {
      await fetch(res.data.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        body: image,
      }).then((res) => {
        let url = res.url.split("?")[0];

        setimage(url);
        setdisplayImageLoader(false);
      });
    });
  };

  const handleLanguageChange = (language) => {
    const dir = language === "EN" ? "ltr" : "rtl";
    setlanguage(language);
    dispatch(languageChange(dir));
  };

  return (
    <>
      <NavBar />

      <div dir={dir} className='signUpContainer'>
        <div>
          <Form.Select
            value={language}
            style={{
              position: "relative",
              top: "12rem",
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
        {showErr && (
          <Alert className='alert-fixed' variant={"danger"}>
            {errMsg}
          </Alert>
        )}
        <h2 style={{ margin: "3rem 0" }}>
          {" "}
          {signText[language]["signUp"]["header"]}
        </h2>

        <Card style={{ padding: "0rem 10rem", marginTop: "4rem" }}>
          <img className='sign_up_pic' src={image ? image : user}></img>
          <Card.Body>
            <label className='custom-file-upload'>
              <Form.Control
                id='fileUpload'
                type='file'
                accept='.jpg'
                onChange={imageUpload}
                ref={inputUpdateAvatarPhoto}
                className='custom-file-input'
              />
              <Plus color='white' size={33} />
            </label>

            <Form
              style={{
                marginTop: "-4rem",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={(e) => {
                checkFieldsFilled(e) &&
                  checkPasswordMatch(e) &&
                  handleSubmit(e, {
                    firstName,
                    lastName,
                    email,
                    password,
                    image,
                  });
              }}
            >
              <h6
                style={{
                  position: "relative",
                  right: dir === "ltr" ? "12rem" : "-12rem",
                }}
              >
                {" "}
                {signText[language]["signUp"]["personalDetails"]}
              </h6>
              {[
                {
                  type: "FirstName",
                  value: firstName,
                  setValue: setfirstName,
                },
                {
                  type: "LastName",
                  value: lastName,
                  setValue: setlastName,
                },
                {
                  type: "Email",
                  value: email,
                  setValue: setemail,
                },
              ].map((obj, id) => (
                <FormComponent
                  displayPass={displayPass}
                  setdisplayPass={setdisplayPass}
                  key={id}
                  {...obj}
                  language={language}
                />
              ))}

              <h6
                style={{
                  position: "relative",
                  right: dir === "ltr" ? "13.7rem" : "-13.7rem",
                  marginTop: "2rem",
                }}
              >
                {signText[language]["signUp"]["Password"]}
              </h6>

              {[
                {
                  type: "Password",
                  value: password,
                  setValue: setpassword,
                },
                {
                  type: "RetypePassword",
                  value: passwordRe,
                  setValue: setpasswordRe,
                },
              ].map((obj, id) => (
                <FormComponent
                  displayPass={displayPass}
                  setdisplayPass={setdisplayPass}
                  key={id}
                  {...obj}
                  language={language}
                />
              ))}

              <Button
                style={{ marginTop: "1rem" }}
                type='submit'
                disabled={displayImageLoader}
                variant='primary'
              >
                {displayImageLoader ? (
                  <Spinner size='sm' animation='border' />
                ) : (
                  signText[language]["signUp"]["header"]
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='bottom_section'>
          <p>{signText[language]["signUp"]["haveAccount"]} </p>
          <a
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => history.push("/sign_in")}
          >
            {signText[language]["signIn"]["signIn"]}
          </a>
        </div>
      </div>
    </>
  );
});

export default SignUp;
