import React from "react";
import {Button} from "react-bootstrap";

class Drink extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Button>
                {this.props.drink.name}
            </Button>
        )
    }

}

export default Drink;
