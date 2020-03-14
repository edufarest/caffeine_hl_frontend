import React from "react";

const API = process.env.API_URL;

class DrinksList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks: []
        }

    }

    componentDidMount() {
        fetch(`${API}/drinks`).then(res => res.json())
            .then(drinks => {

                this.setState({drinks: drinks});

                })

    }



    render() {

        return (
            <div>
                {this.state.drinks && this.state.drinks.map((drink, index) => {

                    // return <Drink drink=drink key=index>

                })}
            </div>
        )
    }

}

export default DrinksList;
