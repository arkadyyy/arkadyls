import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../Redux/action";

const AddUser = (props) => {
  const inputUpdateAvatarPhoto = useRef(null);

  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [roll, setroll] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [image, setimage] = useState("");

  const [displayError, setdisplayError] = useState(false);
  const [errMsg, seterrMsg] = useState("test");
  const [displaySuccess, setdisplaySuccess] = useState(false);

  const resetData = () => {
    setfirstName("");
    setlastName("");
    setemail("");
    setroll("");
    setphone("");
    setaddress("");
    setimage("");
  };

  const imageUpload = () => {
    const image = inputUpdateAvatarPhoto.current?.files[0];

    axios.get("http://localhost:9999/api/s3_url").then(async (res) => {
      console.log("res 1 :", res.data.url);
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
      });
    });
  };

  const addNewUser = () => {
    const data = {
      firstName,
      lastName,
      email,
      roll,
      phone,
      address,
      image,
    };
    console.log(data);
    axios
      .post("http://localhost:9999/api/new_user", data)
      .then((res) => {
        dispatch(getAllUsers(res.data));
        resetData();
        setdisplaySuccess(true);
      })
      .catch((err) => {
        seterrMsg(err.message);
        setdisplayError(true);
        console.log(err.message);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setdisplayError(false);
    }, 3000);
    seterrMsg("");
  }, [displayError]);
  useEffect(() => {
    setTimeout(() => {
      setdisplaySuccess(false);
    }, 3000);
  }, [displaySuccess]);

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3 border-bottom '>
            <Form.Control
              size='sm'
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              type='name'
              placeholder='First Name'
            />
          </Form.Group>
          <Form.Group className='mb-3 border-bottom'>
            <Form.Control
              size='sm'
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              type='name'
              placeholder='Last Name'
            />
          </Form.Group>
          <Form.Group className='mb-3 border-bottom'>
            <Form.Control
              size='sm'
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type='email'
              placeholder='Email'
            />
          </Form.Group>
          <Form.Group className='mb-3 border-bottom'>
            <Form.Control
              size='sm'
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
              type='text'
              placeholder='Phone'
            />
          </Form.Group>
          <Form.Group className='mb-3 border-bottom'>
            <Form.Control
              size='sm'
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              type='text'
              placeholder='Address'
            />
          </Form.Group>
          <Form.Group className='mb-3 '>
            <Form.Label style={{ marginRight: "30px" }}>Roll</Form.Label>
            <Form.Select onChange={(e) => setroll(e.target.value)}>
              <option value='HR'>HR</option>
              <option value='UX/UI'>UX/UI</option>
              <option value='Frontend'>Frontend</option>
              <option value='Backend'>Backend</option>
              <option value='Fullstack'>Fullstack</option>
              <option value='Helpdesk'>Helpdesk</option>
              <option value='Product'>Product</option>
              <option value='Devops'>Devops</option>
            </Form.Select>
          </Form.Group>
          <label>
            <Form.Control
              id='fileUpload'
              type='file'
              accept='.jpg'
              onChange={imageUpload}
              ref={inputUpdateAvatarPhoto}
              //   style={{ display: "none" }}
              // className='custom-file-input'
              style={{ cursor: "pointer !important", padding: "1rem" }}
            />
            add profile pic
          </label>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {displayError ? (
          <Alert variant={"danger"}>{"User alraedy exsits"}</Alert>
        ) : (
          <div></div>
        )}
        {displaySuccess ? (
          <Alert variant={"success"}>{"User Created Successfully"}</Alert>
        ) : (
          <div></div>
        )}
        <div>
          <Button variant='light' onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={addNewUser} variant='success'>
            Add User
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
