import React from "react";
import Drink from "../components/Drink";
import {ButtonGroup, FormControl, InputGroup} from "react-bootstrap";



class DrinksList extends React.Component {

    constructor(props) {
        super(props);


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
                {this.props.drinkRecords.map(rec => {
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
