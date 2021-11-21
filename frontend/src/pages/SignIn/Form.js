import React from "react";
import Form from "react-bootstrap/Form";
import { signText } from "../../utils/utils";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";

const FormComponent = ({
  value,
  setValue,
  type,
  language,
  displayPass,
  setdisplayPass,
}) => {
  const eyeType = (displayPass, setdisplayPass) => {
    if (displayPass) {
      return (
        <EyeSlash
          style={{ cursor: "pointer" }}
          onClick={() => {
            setdisplayPass(!displayPass);
          }}
        />
      );
    } else {
      return (
        <Eye
          style={{ cursor: "pointer" }}
          onClick={() => setdisplayPass(!displayPass)}
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
          minlength={type === "Password" ? 4 : 0}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type={type === "Email" ? "email" : displayPass ? "text" : type}
          placeholder={signText[language]["signIn"][type]}
        />

        {type === "Password" && eyeType(displayPass, setdisplayPass)}
      </InputGroup>
    </>
  );
};

export default FormComponent;
