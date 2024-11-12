import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import './Tickets.css'


function Tickets() {

    const [tickets, setTickets] = useState([]);

    useEffect(()=> {
        async function fetchTickets() {
            try {
                const response = await axios.get('http://localhost:8080/tickets');
                setTickets(response.data);

            } catch (e) {
                console.error(e);
            }
        }
        fetchTickets();
    }, []);


    return (
        <>
            <main className="outer-content-container">
                <div className="inner-content-container">

                    <h1 className="page-title">Book Tickets</h1>
                    <br/>

                    <table className="table">
                    {/*<table>*/}
                        <thead>
                        <tr>
                            <th>TicketId</th>
                            <th>EventName</th>
                            <th>TicketType</th>
                            <th>DayType</th>
                            <th>EventDate</th>
                            <th>Location</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>

                        {tickets.map((ticket) => {
                            return <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.eventname}</td>
                                <td>{ticket.tickettype}</td>
                                <td>{ticket.daytype}</td>
                                <td>{ticket.eventdate}</td>
                                <td>{ticket.location}</td>
                                <td>€{ticket.price}</td>

                                <Link to={`/ticket/${ticket.id}`}>
                                <Button
                                    className="select-button"
                                    type="button"
                                    visibleText="select"
                                />
                                </Link>

                            </tr>
                        })}
                        </tbody>
                    </table>
                    <br/>
                </div>
            </main>
        </>
    );
}

export default Tickets;
