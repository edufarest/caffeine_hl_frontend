import React from "react";

class Drink extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {this.props.drink.name}
            </div>
        )
    }

}

export default Drink;
