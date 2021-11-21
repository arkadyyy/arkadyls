import React from "react";
import Form from "react-bootstrap/Form";
import { signText } from "../../utils/utils";
import { Cursor, Eye, EyeSlash } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";

const FormComponent = ({
  value,
  setValue,
  type,
  language,
  displayPass,
  setdisplayPass,
}) => {
  const eyeType = (displayPass, setdisplayPass, type) => {
    if (displayPass[type]) {
      return (
        <EyeSlash
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log(type);
            console.log(displayPass);
            setdisplayPass({ ...displayPass, [type]: !displayPass[type] });
          }}
        />
      );
    } else {
      return (
        <Eye
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log(type);
            console.log(displayPass);
            setdisplayPass({ ...displayPass, [type]: !displayPass[type] });
          }}
        />
      );
    }
  };

  return (
    <>
      <InputGroup
        className='pt-4 border-bottom '
        controlId='formBasicEmail'
        style={{ width: "500px" }}
      >
        <Form.Control
          size='sm'
          // minlength={
          //   type === "Password"
          //     ? 4
          //     : type === "LastName" || type === "FirstName"
          //     ? 3
          //     : 0
          // }
          minLength='4'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type={
            type === "Email"
              ? "email"
              : displayPass[type]
              ? "text"
              : type === "RetypePassword"
              ? "password"
              : type
          }
          placeholder={
            value === "RetypePassword"
              ? signText[language]["signUp"]["RetypePassword"]
              : signText[language]["signUp"][type]
          }
        />
        {type === "Password" && eyeType(displayPass, setdisplayPass, type)}
        {type === "RetypePassword" &&
          eyeType(displayPass, setdisplayPass, type)}
      </InputGroup>
    </>
  );
};

export default FormComponent;
