import React from "react";
import Form from "react-bootstrap/Form";
import { signText } from "../../utils/utils";

const FormComponent = ({ value, setValue, type, language }) => {
  return (
    <>
      <Form.Group
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
          type={type}
          placeholder={signText[language]["signIn"][type]}
        />
      </Form.Group>
    </>
  );
};

export default FormComponent;
