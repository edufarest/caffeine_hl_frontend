import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

import Cookies from 'js-cookie'

require('dotenv').config();


const LoginModal = props => {

    const API = process.env.REACT_APP_API;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [spinner, setSpinner] = useState(false);

    const loginUser = () => {

        setSpinner(true);

        fetch(API+'/user/login', {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            credentials: "include",
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
                <Modal.Title>Login</Modal.Title>
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

                    <Button variant="primary" onClick={loginUser}>
                        Submit
                    </Button>

                </Form>

            </Modal.Body>

        </Modal>
    )

};

export default LoginModal;
