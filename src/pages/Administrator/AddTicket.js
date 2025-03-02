import React, {useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AddTicket() {

    const [id, setId] = useState("");
    const [eventname, setEventname] = useState("");
    const [tickettype, setTickettype] = useState("");
    const [daytype, setDaytype] = useState("");
    const [location, setLocation] = useState("");
    const [eventdate, setEventdate] = useState("");
    const [price, setPrice] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [errormessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem('token');


    async function addTicket(e) {
        e.preventDefault()
        setErrorMessage(null)
        let pattern = /^\d{4}-\d{2}-\d{2}$/;
        let isMatch = pattern.test(eventdate);
        if (!isMatch) {
            setErrorMessage("NOT VALID (yyyy-mm-dd)")
            return false;
        }

        try{
            const response = await axios.post(`http://localhost:8080/tickets`, {
                id: id,
                eventname: eventname,
                tickettype: tickettype,
                daytype: daytype,
                location: location,
                eventdate: eventdate,
                price: price,
            },

                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            setConfirm(true);

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <main className="outer-content-container">
                <div className="inner-content-container">

                    <div className="form-container">
                        <form className="form" onSubmit={addTicket}>
                            <h1 className="form-title">Add Ticket</h1>
                            <br/>
                            <input
                                type="id"
                                id="id-field"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                name="id"
                                placeholder="id"/>
                            <br/>
                            <br/>
                            <input
                                type="text"
                                id="eventname-field"
                                value={eventname}
                                onChange={(e) => setEventname(e.target.value)}
                                name="eventname"
                                placeholder="eventname"/>
                            <br/>
                            <br/>
                            <input
                                type="tickettype"
                                id="tickettype-field"
                                value={tickettype}
                                onChange={(e) => setTickettype(e.target.value)}
                                name="tickettype"
                                placeholder="tickettype"/>
                            <br/>
                            <br/>
                            <input
                                type="daytype"
                                id="daytype-field"
                                value={daytype}
                                onChange={(e) => setDaytype(e.target.value)}
                                name="daytype"
                                placeholder="daytype"/>
                            <br/>
                            <br/>
                            <input
                                type="text"
                                id="location-field"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                name="location"
                                placeholder="location"/>
                            <br/>
                            <br/>
                            <div>{errormessage}</div>
                            <input
                                type="eventdate"
                                id="eventdate-field"
                                value={eventdate}
                                onChange={(e) => setEventdate(e.target.value)}
                                name="eventdate"
                                placeholder="eventdate (yyyy-mm-dd)"/>
                            <br/>
                            <br/>
                            <input
                                type="price"
                                id="price-field"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="price"
                                placeholder="price"/>
                            <br/>
                            <br/>

                            <Button
                                type="submit"
                                onClick={addTicket}
                                visibleText="Add Ticket"
                            />
                            {confirm === true && <p>Yes! it's done.</p>}

                        </form>

                    </div>
                    </div>
            </main>
        </>
);
}

export default AddTicket;
