import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../Redux/action";
import user_pic from "../../../images/user.png";
import "../Dashboard.css";
const UpdateUser = (props) => {
  const { updatedUser } = props;

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

  const [displayImageLoader, setdisplayImageLoader] = useState(false);

  const setUpdatedUser = () => {
    setfirstName(updatedUser.firstName);
    setlastName(updatedUser.lastName);
    setemail(updatedUser.email);
    setroll(updatedUser.roll);
    setaddress(updatedUser.address);
    setimage(updatedUser.profile_pic);
    setphone(updatedUser.phone);
  };

  useEffect(() => {
    setUpdatedUser();
  }, [updatedUser]);

  const imageUpload = () => {
    setdisplayImageLoader(true);
    const image = inputUpdateAvatarPhoto.current?.files[0];

    axios.get("http://localhost:9999/api/s3_url").then(async (res) => {
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

  const updateUser = (e) => {
    e.preventDefault();
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
      .post("http://localhost:9999/api/update_user", data)
      .then((res) => {
        dispatch(getAllUsers(res.data));
        setdisplaySuccess(true);
      })
      .catch((err) => {
        seterrMsg(err.message);
        setdisplayError(true);
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
        <Modal.Title id='contained-modal-title-vcenter'>
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => updateUser(e)}>
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
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
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
            <Form.Select value={roll} onChange={(e) => setroll(e.target.value)}>
              <option value=''>not selected</option>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={image ? image : user_pic}
            />
            <label className='image_label'>
              <Form.Control
                id='fileUpload'
                type='file'
                accept='.jpg'
                onChange={imageUpload}
                ref={inputUpdateAvatarPhoto}
                style={{ cursor: "pointer !important", padding: "1rem" }}
              />
              Change profile pic
            </label>
          </div>
          {displayImageLoader && <Spinner size='sm' animation='border' />}
          <Button type='submit' disabled={displayImageLoader} variant='success'>
            Update User
          </Button>
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
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUser;
