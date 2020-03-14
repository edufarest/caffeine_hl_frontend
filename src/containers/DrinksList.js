import React from "react";
import Drink from "../components/Drink";


const API = "http://localhost:3000";

class DrinksList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks: []
        }

    }

    componentDidMount() {



        fetch(`${API}/drinks`).then(res => {

            console.log("Got: ");
            console.log(res)

            res.json()
                .then(drinks => {

                    console.log("Got drinks: " + drinks);

                    this.setState({drinks: drinks});

                })
        });

    }



    render() {

        return (
            <div>
                {this.state.drinks && this.state.drinks.map((drink, index) => {

                    console.log("Drink: " + drink.name);

                    return <Drink drink={drink} key={index}/>

                })}
            </div>
        )
    }

}

export default DrinksList;
