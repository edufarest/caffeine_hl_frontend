import React from "react";

class DrinkRecords extends React.Component {

    constructor(props) {
        super(props);
    }

    dateTimeString(inputDate) {

        const date = new Date(inputDate);

        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        let hour = date.getHours();

        if (hour > 12) {

            hour = (hour % 12);

        } else {
            hour += 1;
        }

        if (hour < 10) {
            hour = '0' + hour;
        }

        let minutes = date.getMinutes();

        minutes = minutes >= 10 ? minutes : '0' + minutes;

        const amPm = date.getHours() > 12 ? "PM" : "AM";

        return `${hour}:${minutes} ${amPm}`
    }


    render() {

        const drinkRecords = this.props.drinkRecords.map(record => {

            const drink = record.drink;

            return (
                <tr className="drink-records__record">
                    <td className="drink-records__record__name">{drink.name}</td>
                    <td className="drink-records__record__caff">{drink.caffeine} mg</td>
                    <td className="drink-records__record__serving">{drink.serving} ml</td>
                    <td className="drink-records__record__time">{this.dateTimeString(record.date)}</td>
                </tr>
            )
        });


        return (
            <div className="drink-records__list">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Caffeine</th>
                        <th>Serving</th>
                        <th>Time</th>
                    </tr>
                    {drinkRecords}
                </table>
            </div>
        )
    }


}

export default DrinkRecords;
