import React from "react";
import Drink from "../components/Drink";
import {ButtonGroup, FormControl, InputGroup} from "react-bootstrap";


class DrinksList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: "",
        }

    }


    render() {

        return (
            <div className="drinks-list">

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Drink"
                        onChange={event => {

                            this.setState({filter: event.target.value});

                        }}
                        />
                </InputGroup>

                <ButtonGroup vertical>
                    {this.props.drinks && this.props.drinks.filter(drink => {

                        return drink.name.match(new RegExp('.*'+this.state.filter+'.*', 'i'));


                    }).map((drink, index) => {

                        return <Drink drink={drink} key={index} createDrinkRecord={this.props.createDrinkRecord}/>

                    })}
                </ButtonGroup>
            </div>
        )
    }

}

export default DrinksList;
