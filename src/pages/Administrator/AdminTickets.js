import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AdminTickets() {

    const token = localStorage.getItem('token');
    const [tickets, setTickets] = useState([]);
    const [selectDelete, setDelete] = useState(false);


    useEffect(()=> {
        const controller = new AbortController();
        async function fetchTickets() {

            try {
                const response = await axios.get('http://localhost:8080/tickets/admin', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setTickets(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        void fetchTickets();
        return function cleanup() {
            controller.abort();
        }
    }, [selectDelete]);


    function deleteSelected(ticketId) {
        setDelete(!selectDelete);
        deleteTicket(ticketId)
    }


    async function deleteTicket(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/tickets/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <main className="outer-content-container">
                <div className="inner-content-container">

                    <h1 className="page-title">Tickets</h1>
                    <h5>(Only accessible for administrator)</h5>
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

                                <Button
                                    type="submit"
                                    // onClick={(e) => changeSelected(e, ticket.id)}
                                    visibleText="change"
                                />

                                <Button
                                    type="submit"
                                    onClick={() => deleteSelected(ticket.id)}
                                    visibleText="delete"
                                />

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

export default AdminTickets;
