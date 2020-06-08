import React from 'react';
import './App.css';
import DrinksList from "./containers/DrinksList";
import CaffeineGraph from "./containers/CaffeineGraph"

import 'bootstrap/dist/css/bootstrap.min.css';

require('dotenv').config();

const API = process.env.REACT_APP_API;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            drinks: [],
            drinkRecords: [],
            date: Date.now()

        }


    }


    getDrinks = () => {
        fetch(`${API}/drinks`).then(res => {

            res.json()
                .then(drinks => {


                    this.setState({drinks: drinks});

                })
        });
    };

    getRecords = () => {

        console.log("Getting records")

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

    };

    componentDidMount() {
        this.getDrinks();
        this.getRecords();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("Updated: checking");
    //     if (prevState !== this.state) {
    //         console.log(this.state);
    //         // this.getRecords();
    //     }
    // }


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
                    console.log(data);
                    this.getRecords();
                })
        })

    }

    render() {

        return (
            <div className="App">
                <header className="">
                    Welcome to Caffeine HL
                </header>


                <div>

                    <CaffeineGraph drinkRecords={this.state.drinkRecords} date={this.state.date}/>
                    
                    <h3>Choose a drink:</h3>


                    <DrinksList drinks={this.state.drinks} createDrinkRecord={drink => {this.createDrinkRecord(drink)}}/>


                </div>
            </div>
        );
    }
}

export default App;
