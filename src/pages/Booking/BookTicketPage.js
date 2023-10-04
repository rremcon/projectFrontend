import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Button from "../../components/Button/Button";
import Ticket from "../../components/Ticket/Ticket";
import Result from "../../components/Result/Result";
import {ClickContext} from "../../context/ClickContext";
import {AuthContext} from "../../context/AuthContext";
import './BookTicketPage.css'


const BookTicketPage = () => {

    const {user} = useContext(AuthContext);
    const {minOneFunction, plusOneFunction, clicks} = useContext(ClickContext)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [choice, toggleChoice] = useState(false)
    const [confirm, setConfirm] = useState(false);
    const [data, setData] = useState([])
    const {id} = useParams()

    function toggle() {
        toggleChoice(choice => !choice)
    }


    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/tickets/${id}`, {
                    signal: controller.signal,
                });
                setData(response.data);

            } catch (e) {
                console.error(e)
                setError(true)

                if(axios.isCancel(e)){
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }
        fetchData()

        return function cleanup() {
            controller.abort();
        }
    }, [id])



    async function confirmTicketBooking(e) {
        e.preventDefault();
        try{
            const response = await axios.post(`http://localhost:8080/orders/${user.id}`, {
                orderid: id,
                selecteditem: id,
                quantity: clicks,
                price: price,
                totalprice: clicks*price,
            });
            setConfirm(true);

        } catch(e) {
            console.error(e);
        }
    }


    const {eventname, tickettype, daytype, location, eventdate, price} = data;
    return (
        <>
            <main>
                <div className="ticket-page-inner-container">
                    <form onSubmit={confirmTicketBooking}>
                        {loading && <p>Loading...</p>}
                        {error && <p></p>}

                        <Ticket
                    className="ticket-item"
                    id={id}
                    eventname={eventname}
                    tickettype={tickettype}
                    daytype={daytype}
                    location={location}
                    eventdate={eventdate}
                    price={price}
                />
            <br/>
            <br/>
            <div className="ticket-handling">

                <Button
                    type="button"
                    className="quantity-button"
                    onClick={minOneFunction}
                    disabled={clicks === 0}
                    visibleText="-"
                />

                <br/>

                <Button
                    type="button"
                    className="quantity-button"
                    onClick={plusOneFunction}
                    disabled={clicks === 6}
                    visibleText="+"
                />

                <Result
                clicks={clicks}
                />

                <br/>
            <br/>
            { choice? <p></p> : <p></p>}

            <Button
                type="button"
                className="toggleButton"
                onClick={toggle}
                visibleText="Buy Ticket(s)"
            />

            <input
                type="checkbox"
                checked={choice}
                onChange={(e) => {toggleChoice(e.target.checked)}}
            />
            <br/>

            <Button
                className="confirm-booking-button"
                type="submit"
                onClick={confirmTicketBooking}
                visibleText="Confirm Booking"
            />
                {confirm === true && <p>Booking Confirmed!</p>}

                </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default BookTicketPage;
