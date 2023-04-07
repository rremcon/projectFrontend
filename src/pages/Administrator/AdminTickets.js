import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AdminTickets() {

    const [tickets, setTickets] = useState([]);
    const [deleteTicket, toggleDeleteTicket] = useState(false);
    const [id, setIdToDelete] = useState("");


    useEffect(()=> {
        async function fetchTickets() {
            try {
                const response = await axios.get('http://localhost:8080/tickets');
                setTickets(response.data);
                console.log(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchTickets();
    }, []);



    function deleteSelected(e, id) {
        e.preventDefault();
        toggleDeleteTicket(true);
        setIdToDelete(id);
    }

    useEffect(() => {
        const controller = new AbortController();
        async function deleteTicket() {
            try {
                const response = await axios.delete(`http://localhost:8080/tickets/${id}`, {
                    id: id,
                    signal: controller.signal,
                });
                setIdToDelete(response.data);
                console.log(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        void deleteTicket();
        return function cleanup() {
            controller.abort();
        }
    }, [deleteTicket])



    return (
        <>
            <main>
                <div className="inner-container">
                    <h1 className="page-title">Tickets</h1>
                    <br/>
                    <table className="table">
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
                                >change
                                </Button>

                                <Button
                                    type="submit"
                                    onClick={(e) => deleteSelected(e, ticket.id)}
                                >delete
                                </Button>

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
