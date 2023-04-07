import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ticket from "../../components/Ticket/Ticket";


    function AccountPage() {

        const {user : {id, email, username}} = useContext(AuthContext)
        const [privateContent, setPrivateContent] = useState({})

        useEffect(()=> {

            const storedToken = localStorage.getItem('token')

            async function fetchPrivateData(id) {
                try {
                    const response = await axios.get(`http://localhost:8080/accounts/${id}`, {
                        headers:
                            {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${storedToken}`,
                            }
                    })
                    setPrivateContent(response.data)
                    console.log(response)

                } catch (e) {
                    console.error(e)
                }
            }
            void fetchPrivateData()
        }, [])



        return (
        <>
            <main>
            <div className="account-page">
            <h1 className="page-title">Account</h1>
                <br/>
                <br/>
                <h2>Hi! {username}</h2>
                <br/>
                <h3>AccountDetails</h3>
                <br/>
                <span>AccountNr. {id}</span>
                <span>{email}</span>
                <br/>
                <br/>
                <h3>BookingDetails</h3>
                <h2>{privateContent.title}</h2>
                <p>{privateContent.content}</p>
                <p>...</p>
                <p>........</p>
                <table>
                    <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>TicketId</th>
                        <th>TotalPrice</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<td>{account.id}</td>*/}
                    {/*<td>{order.id}</td>*/}
                    <td>{ticket.id}</td>
                    {/*<td>{ticket.eventname}</td>*/}
                    </tbody>
                </table>
                <br/>
            </div>
            </main>
        </>
    );
}

export default AccountPage;
