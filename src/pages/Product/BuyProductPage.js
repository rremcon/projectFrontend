import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";


const BuyProductPage = () => {

    const [paytype, setSelectedPay] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([])
    const {id} = useParams()
    console.log(id)


    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get("http://localhost:8080/products/" + id, {
                    signal: controller.signal,
                });
                setData(response.data);
            } catch (e) {
                //console.error(e)
                setError(true)

                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
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
                recipient: "",
                message: "",
                subject: "",
            });
            console.log(response.data);
            setConfirm(true);

        } catch(e) {
            console.error(e);
        }
    }


    const {img, title, description, price} = data;
    return (
        <>
            <main>
                {loading && <p>Loading...</p>}
                {error && <p>Error: Could not fetch data!</p>}

                <div className="product-page-inner-container">
                    <Product
                        className="product-item"
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
                                <option value="Klarna">
                                    Klarna
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
                        >Confirm Payment
                            {confirm === true && <p>Check your mailbox!</p>}
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default BuyProductPage;
