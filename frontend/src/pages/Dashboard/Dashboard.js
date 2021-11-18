import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils/utils";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import user_pic from "../../images/user.png";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../Redux/action";
import "./Dashboard.css";
import AddUser from "./AddUser/AddUser";
import UpdateUser from "./UpdateUser/UpdateUser";
import NavBar from "../../components/Navbar";
import { Pencil, Trash } from "react-bootstrap-icons";

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [updatedUser, setupdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    roll: "",
    phone: "",
    profile_pic: "",
  });
  const [showAddUser, setshowAddUser] = useState(false);
  const [showUpdateUser, setshowUpdateUser] = useState(false);

  const decoded_jwt = Cookies.get("jwt")
    ? jwt_decode(Cookies.get("jwt"))
    : null;

  const handleDeleteUser = (_id, email) => {
    console.log(email);
    console.log(decoded_jwt);
    axios
      .delete(`${BASE_API_URL}/delete_user`, {
        data: {
          _id,
        },
      })
      .then((res) => {
        if (decoded_jwt.email === email) {
          Cookies.remove("jwt");
          history.push("/");
        } else {
          dispatch(getAllUsers(res.data));
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/all_users`)
      .then((res) => dispatch(getAllUsers(res.data)));
  }, []);

  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Roll</th>
          <th>Start Date</th>
          {decoded_jwt.is_admin && <th></th>}
        </tr>
      </thead>
    );
  };

  const TableRow = ({ user }) => {
    return (
      <tr key={user._id}>
        <td>
          <Image
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={user.profile_pic === "" ? user_pic : user.profile_pic}
          />
        </td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.phone}</td>
        <td>{user.address}</td>
        <td>{user.roll}</td>
        <td>{user.createdAt.split("T")[0]}</td>
        {decoded_jwt.is_admin && (
          <>
            <td>
              <Pencil
                className='update_delete_icons'
                onClick={() => {
                  setupdatedUser(users.find((obj) => obj._id === user._id));
                  setshowUpdateUser(true);
                }}
              />
              <Trash
                className='update_delete_icons'
                onClick={() => handleDeleteUser(user._id, user.email)}
              />
            </td>
          </>
        )}
      </tr>
    );
  };

  return (
    <>
      {Cookies.get("jwt") ? (
        <>
          <NavBar page={"dashboard"} />
          <Container>
            <div className='dashboard_header'>
              <h3>Managing Employees</h3>
              <Button
                disabled={!decoded_jwt.is_admin}
                onClick={() => setshowAddUser(true)}
                size='md'
              >
                + Add Employee
              </Button>
            </div>
            <Table hover>
              <TableHead />
              <tbody>
                {users.map((user) => (
                  <TableRow user={user} />
                ))}
              </tbody>
            </Table>
          </Container>

          <AddUser show={showAddUser} onHide={() => setshowAddUser(false)} />
          <UpdateUser
            updatedUser={updatedUser}
            show={showUpdateUser}
            onHide={() => setshowUpdateUser(false)}
          />
        </>
      ) : (
        <>
          <Redirect
            to={{
              pathname: "/sign_in",
            }}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
