import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Picture from "../../components/Picture/Picture";
import Button from "../../components/Button/Button";
import Product from "../../components/Product/Product";
import './Products.css'

//PRODUCT COMPONENT WORDT (NOG) NERGENS GEBRUIKT!?

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
    }, [])


    return (
        <>
            <main>
            {loading && <p>Loading...</p>}
            {error && <p></p>}

            <h1 className="page-title">Buy Products</h1>
            <div className="grid-container">
                {
                    products.map((product) => {
                        return (
                            <article className="grid-box"
                                key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <Picture
                                        img={product.img}
                                        imgTitle={product.title}
                                    />
                                    <div className="grid-box-content">
                                    <h3 className="box-title">
                                        {product.title.slice(0, 25)}</h3>
                                    <br/>
                                    <p className="box-content">
                                        {product.description}</p>
                                        <br/>
                                        <span className="box-price">€{product.price}</span>
                                        <br/>

                                        <Button
                                            className="buy-button"
                                            type="button"
                                            visibleText="Buy"
                                        />


                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}
                                        {/*<Product/>*/}

                                        {/*<Product*/}
                                        {/*    title="productexample"*/}
                                        {/*    description="productdescriptionexample"*/}
                                        {/*/>*/}

                                        {/*<Product*/}
                                        {/*    title="productexample"*/}
                                        {/*    description="productdescriptionexample"*/}
                                        {/*/>*/}


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
