import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AdminOrders() {

    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [deleteOrder, toggleDeleteOrder] = useState(false);
    const [id, setIdToDelete] = useState("");


    useEffect(()=> {

        async function fetchOrders() {
            try {
                const response = await axios.get('http://localhost:8080/orders');
                setOrders(response.data);
                console.log(response.data);

            } catch (e) {
                console.error(e);
            }
        }
        fetchOrders();
    }, []);


    function deleteSelected(e, orderId) {
        e.preventDefault();
        toggleDeleteOrder(true);
        setIdToDelete(orderId);
    }


    useEffect(() => {
        const controller = new AbortController();
        async function deleteOrder() {
            try {
                const response = await axios.delete(`http://localhost:8080/accounts/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
            } catch (e) {
                console.error(e);
            }
        }

        void deleteOrder();
        return function cleanup() {
            controller.abort();
        }
    }, [deleteOrder])




    return (
        <>
            <main>
                <div className="inner-container">
                    <h1 className="page-title">Orders</h1>
                    <br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>TicketId</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>TotalPrice</th>
                        </tr>
                        </thead>
                        <tbody>

                        {orders.map((order) => {
                            return <tr key={order.id}>
                                <td>{order.orderid}</td>
                                <td>{order.selectedticket}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.calculateAmount}</td>

                                <Button
                                    type="submit"
                                    // onClick={(e) => changeSelected(e, order.id)}
                                >change
                                </Button>

                                <Button
                                    type="submit"
                                    onClick={(e) => deleteSelected(e, order.id)}
                                >delete
                                </Button>

                            </tr>
                        })}
                        </tbody>
                    </table>

                    {deleteOrder &&
                        <h4 >REMOVED!</h4>}
                    <br/>
                </div>
            </main>
        </>
    );
}

export default AdminOrders;


