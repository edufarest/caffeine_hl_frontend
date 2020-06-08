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

        this.getRecords();

    }

    getRecords = () => {

        fetch(`${API}/records?date=${this.state.date}`)
            .then(res => res.json().then(res => {
                console.log(res);

                const records = [];

                // "_id":"5eddc366753b0c74a7509b29","date":"2020-06-08T04:49:42.102Z",
                //     "drink":{"name":"10 Hour Energy Shot","_id":"5e5f325652ea8febab944a33",
                //     "servingSize":29.574,"caffeine":422,"__v":0},"__v":0}]
                res.forEach(rec => {

                    let drink = {};

                    if (rec.drink) {

                        drink = {
                            id: rec.drink._id, name: rec.drink.name, serving: rec.drink.servingSize,
                            caffeine: rec.drink.caffeine
                        };
                    }

                    records.push({id: rec._id, date: rec.date, drink: drink});
                });

                this.setState({drinkRecords: records});

            }))

    }

    componentDidMount() {
        this.getRecords();
    }

    // FIXME Inf loop
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevState !== this.state || prevProps !== this.props) {
    //         this.getRecords();
    //     }
    // }

    render() {


        return (
            <div>
                {this.state.drinkRecords.map(rec => {
                    return (
                        <div>
                            <span>{rec.drink && rec.drink.name}</span>
                            <span>{rec.date}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default DrinksList;
