import React from "react";
import Drink from "../components/Drink";
import {ButtonGroup, FormControl, InputGroup} from "react-bootstrap";


const API = "http://localhost:3000";

class DrinksList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            filter: "",
        }

    }

    componentDidMount() {



        fetch(`${API}/drinks`).then(res => {

            res.json()
                .then(drinks => {


                    this.setState({drinks: drinks});

                })
        });

    }

    createDrinkRecord(drink) {

        fetch(`${API}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({drink: drink, date: Date.now()})
        }).then((res) => {
            res.json()
                .then(data => {
                    console.log(data)
                })
        })

    }


    render() {

        return (
            <div>

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Drink"
                        onChange={event => {

                            this.setState({filter: event.target.value});

                            console.log(event.target.value)
                        }}
                        />
                </InputGroup>

                <ButtonGroup vertical>
                    {this.state.drinks && this.state.drinks.filter(drink => {

                        return drink.name.match(new RegExp('.*'+this.state.filter+'.*', 'i'));


                    }).map((drink, index) => {

                        console.log("Drink: " + drink.name);

                        return <Drink drink={drink} key={index} createDrinkRecord={this.createDrinkRecord}/>

                    })}
                </ButtonGroup>
            </div>
        )
    }

}

export default DrinksList;
