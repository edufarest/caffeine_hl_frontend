import React from 'react';
import './App.css';
import DrinksList from "./containers/DrinksList";
import CaffeineGraph from "./containers/CaffeineGraph"
import DrinkRecords from "./containers/DrinkRecords";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";

import Cookies from 'js-cookie';

require('dotenv').config();

const caffHL = process.env.REACT_APP_CAFFEINE_HL; //330 minutes. 5.5 hours
const API = process.env.REACT_APP_API;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            drinks: [],
            drinkRecords: [],
            date: Date.now(), // TODO Update in bg
            currCaffeine: 0,
            user: null,
            modal: ""
        }

        // fetch("http://localhost:3000/user/login", {
        //     method: "POST",
        //     body: JSON.stringify({username: "edu", password: "123"}),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

    }


    getDrinks = () => {
        fetch(API+'/drinks').then(res => {

            res.json()
                .then(drinks => {


                    this.setState({drinks: drinks});

                }).catch(err => {
                    console.error(err);
            })
        }).catch(err => {
            console.error(err);
        });
    };

    getRecords = () => {

        console.log("Getting records");

        fetch(`${API}/records?date=${this.state.date}`, {credentials: "include"})
            .then(res => res.json().then(res => {
                console.log(res);

                const records = [];
                let currCaff = 0;

                // "_id":"5eddc366753b0c74a7509b29","date":"2020-06-08T04:49:42.102Z",
                //     "drink":{"name":"10 Hour Energy Shot","_id":"5e5f325652ea8febab944a33",
                //     "servingSize":29.574,"caffeine":422,"__v":0},"__v":0}]
                res.forEach(rec => {

                    let drink = {};

                    if (rec.drink) {

                        const name = rec.drink.name;
                        const servingSize = rec.drink.servingSize;
                        const caffeine = rec.drink.caffeine;

                        drink = {
                            id: rec.drink._id, name: name, serving: servingSize,
                            caffeine: caffeine
                        };

                        // TODO Take absorption time in consideration. ~30m?
                        const duration = (new Date(this.state.date).getTime() - new Date(rec.date).getTime() ) / 60000; // Duration in minutes

                        currCaff += caffeine * Math.pow(0.5, duration / caffHL);

                    }

                    records.push({id: rec._id, date: rec.date, drink: drink});
                });

                this.setState({drinkRecords: records, currCaffeine: currCaff});

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

        fetch(API+'/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({drink: drink, date: Date.now()})
        }).then((res) => {
            res.json()
                .then(data => {
                    console.log(data);
                    this.getRecords();
                })
        })

    }

    deleteDrinkRecord(id) {

        fetch(`${API}/records/${id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.ok) {
                this.getRecords();
            }
        }).catch(err => {
           console.error(err);
        })

    }

    render() {

        const username = this.state.user && this.state.user.username;

        return (
            <div className="App">
                <Navbar bg="dark" expand="xl"i variant="dark">
                    <Navbar.Brand>Caffeine Half-Life</Navbar.Brand>

                    <Navbar.Text className="justify-content-end">
                        {username? `Welcome, ${username}` :
                            <span><a href="#" onClick={() => this.setState({modal: "login"})}>Login</a>
                                / <a href="#" onClick={() => this.setState({modal: "register"})}>Register</a></span>}

                    </Navbar.Text>

                </Navbar>
                <div>


                    <RegisterModal show={this.state.modal === "register"} handleClose={() => this.setState({modal: ''})} setUser={user => this.setState({user: user})}/>
                    <LoginModal show={this.state.modal === "login"} handleClose={() => this.setState({modal: ''})} setUser={user => this.setState({user: user})}/>

                    <div className="caffeine-indicator">
                        <span>Caffeine: {this.state.currCaffeine.toFixed(2)} mg</span>
                    </div>

                    <div className="drinks-records">
                        <CaffeineGraph drinkRecords={this.state.drinkRecords} date={this.state.date}/>
                        <DrinkRecords drinkRecords={this.state.drinkRecords} deleteDrinkRecord={(id) => this.deleteDrinkRecord(id)}/>
                    </div>

                    <h3>Choose a drink:</h3>


                    <DrinksList  drinks={this.state.drinks}
                                 createDrinkRecord={drink => {this.createDrinkRecord(drink)}}/>


                </div>
            </div>
        );
    }
}

export default App;
