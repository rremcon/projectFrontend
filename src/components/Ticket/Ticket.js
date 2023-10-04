import React from 'react';
import './Ticket.css'


function Ticket({className, id, eventname, tickettype, daytype, location, eventdate, price}) {

    return (
        <>
            <div className={className}>
                <h1>Ticket {id}</h1>
                <br/>
                <h2>{eventname}</h2>
                <h2>{tickettype}</h2>
                <h3>{daytype}</h3>
                <p>{location}</p>
                <p>{eventdate}</p>
                <br/>
                <br/>
                <span>€{price}</span>
            </div>
        </>
    );
}

export default Ticket;
