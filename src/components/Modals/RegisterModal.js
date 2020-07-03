import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
require('dotenv').config();


const RegisterModal = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [spinner, setSpinner] = useState(false);

    const registerUser = () => {

        setSpinner(true);

        fetch('/user/register', {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                setSpinner(false);
                props.handleClose();
            }
        })

    };

   return (
       <Modal
          show={props.show}
          onHide={props.handleClose}
       >

          <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
          </Modal.Header>

          <Modal.Body>

              <Form>
                  <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="Username" value={username}
                                    onChange={ev => setUsername(ev.target.value)}/>
                  </Form.Group>

                  <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="password" value={password}
                                    onChange={ev => setPassword(ev.target.value)}/>
                  </Form.Group>

                  <Button variant="primary" onClick={registerUser}>
                      Submit
                  </Button>

              </Form>

          </Modal.Body>

       </Modal>
   )

};

export default RegisterModal;
