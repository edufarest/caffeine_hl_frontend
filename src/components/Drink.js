import React from "react";
import {Button} from "react-bootstrap";

class Drink extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Button onClick={() => {this.props.createDrinkRecord(this.props.drink.id)}}
            >
                {this.props.drink.name}: {this.props.drink.caffeine} mg
            </Button>
        )
    }

}

export default Drink;
