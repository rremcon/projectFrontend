import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


const Products = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try{
                setError(false);
                const response = await axios.get('http://localhost:8080/products', {
                    signal: controller.signal,
            });
                setProducts(response.data);
                console.log(response.data);


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
    }, [])


    return (
        <>
            <main>
            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}

            <h1 className="page-title">Buy Products</h1>
            <div className="grid-container">
                {
                    products.map((product) => {
                        return (
                            <article className="grid-box"
                                key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <img className="box-image" src={product.img} alt={product.title}/>
                                    <div className="grid-box-content">
                                    <h3 className="box-title">
                                        {product.title.slice(0, 25)}</h3>
                                    <br/>
                                    <p className="box-content">
                                        {product.description}</p>
                                        <br/>
                                        <span className="box-price">€{product.price}</span>
                                        <br/>

                                        <button
                                            className="buy-button"
                                        >Buy
                                        </button>
                                    </div>
                                </Link>
                            </article>
                        )
                    })
                }
            </div>
            </main>
        </>
    );
}

export default Products;
