import React from "react";
import Drink from "../components/Drink";
import {ButtonGroup, FormControl, InputGroup} from "react-bootstrap";

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import date from 'date-and-time';

const caffHL = process.env.REACT_APP_CAFFEINE_HL;


class DrinksList extends React.Component {

    constructor(props) {
        super(props);


    }

    // DrinkRecord and timestamp(ms)
    calculateCaffeine(record, time) {

        // const duration = (new Date(this.state.date).getTime() - new Date(rec.date).getTime() ) / 60000; // Duration in minutes
        //
        // currCaff += caffeine * Math.pow(0.5, duration / caffHL);

        const duration = (time - new Date(record.date).getTime()) / 60000;

        return (record.drink.caffeine * Math.pow(0.5, duration / caffHL)).toFixed(2);


    }


    render() {

        const data = [];


        // Time, calculate the following 10 hours

        // Starting from now -> 24 hours?

        const now = Date.now();

        const hours = 12;

        for (let i = 0; i < hours*60*60*10000/5; i += 60*60*10000/5) {

            const timestamp = now + i;
            const dateString = date.format(new Date(timestamp), 'hh:mm A');

            console.log(dateString);

            const records = {time: dateString};

            this.props.drinkRecords.forEach(rec => {

                const caff = this.calculateCaffeine(rec, timestamp);
                const name = rec.drink.name;

                records[name] = caff;

            });

            data.push(records);

        }


        const areas = [];

        const getRandomColor = () => {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        this.props.drinkRecords.forEach(rec => {

            const color = getRandomColor();

            areas.push(
                <Area type='monotone' dataKey={rec.drink.name} stackId="1"
                stroke={color} fill={color}/>
            )

        });


        return (
            <div className="caffeine_graph">
                <AreaChart  width={2000} height={400} data={data}>

                   <XAxis dataKey="time"/>
                   <YAxis/>
                   <Tooltip/>

                    {areas}

                </AreaChart>
            </div>
        )
    }

}

export default DrinksList;
