import React from "react";
import {Button} from "react-bootstrap";

class Drink extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Button onClick={() => {this.props.selectDrink(this.props.drink)}}
            >
                {this.props.drink.name}: {this.props.drink.caffeine} mg
            </Button>
        )
    }

}

export default Drink;
