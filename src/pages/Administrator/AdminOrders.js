import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AdminOrders() {

    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [selectDelete, setDelete] = useState(false);


    useEffect(()=> {
        const controller = new AbortController();
        async function fetchOrders() {

            try {
                const response = await axios.get('http://localhost:8080/orders', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setOrders(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchOrders();
        return function cleanup() {
            controller.abort();
        }
    }, [selectDelete]);


    function deleteSelected(orderId) {
        setDelete(!selectDelete);
        deleteOrder(orderId)
    }


    async function deleteOrder(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/orders/${id}`, {
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

                    <h1 className="page-title">Orders</h1>
                    <h5>(Only accessible for administrator)</h5>
                    <br/>

                    <table className="table">
                    {/*<table>*/}
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>ItemId</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>TotalPrice</th>
                        </tr>
                        </thead>
                        <tbody>

                        {orders.map((order) => {
                            return <tr key={order.id}>
                                <td>{order.orderid}</td>
                                <td>{order.selecteditem}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.price * order.quantity}</td>

                                <Button
                                    type="submit"
                                    // onClick={(e) => changeSelected(e, order.id)}
                                    visibleText="change"
                                />

                                <Button
                                    type="submit"
                                    onClick={() => deleteSelected(order.orderid)}
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

export default AdminOrders;
