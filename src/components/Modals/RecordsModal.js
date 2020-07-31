import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import TimePicker from "react-time-picker";
import moment from 'moment';

import Cookies from 'js-cookie'

require('dotenv').config();


const RecordsModal = props => {

    const API = process.env.REACT_APP_API;

    const [date, setDate] = useState(Date.now());

    const [spinner, setSpinner] = useState(false);

    const name = (props.selectedDrink && props.selectedDrink.name) || "Drink";
    const drink = props.selectedDrink && props.selectedDrink._id;

    const createRecord = (drink, date) => {

        props.createDrinkRecord(drink, date);
        props.handleClose();

    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
        >

            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input type="datetime-local" onChange={e => setDate(moment(e.target.value))}/>
            </Modal.Body>


            <Modal.Footer>
                <Button variant="primary" onClick={() => createRecord(drink, date)}>
                    Add Drink!
                </Button>
            </Modal.Footer>
                
          

        </Modal>
    )

};

export default RecordsModal;
