import React from "react";
import Drink from "../components/Drink";
import {ButtonGroup, FormControl, InputGroup} from "react-bootstrap";


const API = "http://localhost:3000";

class DrinksList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinkRecords: [],
            date: Date.now()
        }

    }

    getRecords = () => {

        fetch(`${API}/records?date=${this.state.date}`)
            .then(res => res.json().then(res => {
                console.log(res);
            }))

    }

    componentDidMount() {

        this.getRecords();


    }



    render() {

        return (
            <div>

            </div>
        )
    }

}

export default DrinksList;
