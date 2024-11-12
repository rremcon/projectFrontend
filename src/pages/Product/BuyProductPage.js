import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";
import './BuyProductPage.css'
import {AuthContext} from "../../context/AuthContext";


const BuyProductPage = () => {

    const {user} = useContext(AuthContext);

    const [paytype, setSelectedPay] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([])
    const {id} = useParams()


    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/products/${id}`, {
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


    async function confirmPayment(e) {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/sendMail', {
                recipient: "@mailaddress",
                message: "This is the Payment Link",
                subject: "Payment",
                // attachment: "C:/users/skikk/downloads/mvwc.jpg"
            });
            setConfirm(true);

        } catch(e) {
            console.error(e);
        }
    }


    async function confirmBuyProduct(e) {
        e.preventDefault();
        try{
            const response = await axios.post(`http://localhost:8080/orders/${user.id}`, {
                orderid: id,
                selecteditem: id,
                price: price,
                totalprice: price,
            });
            setConfirm(true);

        } catch(e) {
            console.error(e);
        }
    }


    const {img, title, description, price} = data;
    return (
        <>
            <main className="outer-content-container">
                {loading && <p>Loading...</p>}
                {error && <p></p>}

                <div className="inner-content-container">
                    <h1 className="page-title-sold-out">SOLD OUT!</h1>

                    <div className="buy-product-container">

                        <Product
                            className="product-tile"
                            id={id}
                            img={img}
                            title={title}
                            description={description}
                            price={price}
                        />

                        <form className="form-container-payment" onSubmit={confirmPayment}>
                            <h1 className="form-title">Payment</h1>
                            <br/>
                            <label htmlFor="pay-type-selection">
                                <h4>Select Pay:</h4>
                                <select
                                    id="pay-type-choice"
                                    name="pay-type-choice-field"
                                    value={paytype}
                                    onChange={(e) => setSelectedPay(e.target.value)}
                                >
                                    <option value="IDeal">
                                        IDeal
                                    </option>
                                    <option value="PayPal">
                                        PayPal
                                    </option>
                                    <option value="CreditCard">
                                        CreditCard
                                    </option>
                                    <option value="Visa">
                                        Visa
                                    </option>
                                </select>
                            </label>
                            <br/>
                            <Button
                                className="confirm-payment-button"
                                type="submit"
                                onClick={confirmPayment}
                                disabled={true}
                                visibleText="Confirm Payment"
                            />
                            {confirm === true && <p>Check your mailbox!</p>}

                            <br/>
                            <br/>

                            <Button
                                className="confirm-buy-button"
                                type="submit"
                                onClick={confirmBuyProduct}
                                visibleText="Confirm Buy"
                            />
                            {confirm === true && <p><strong className="confirmation-not"><em>NOT</em></strong> Confirmed.</p>}

                        </form>

                    </div>
                </div>
            </main>
        </>
    );
};

export default BuyProductPage;
