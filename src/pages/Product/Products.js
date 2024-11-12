import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Picture from "../../components/Picture/Picture";
import Button from "../../components/Button/Button";
import Product from "../../components/Product/Product";
import './Products.css'


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
            <main className="outer-content-container">
                <div className="inner-content-container">

                    {loading && <p>Loading...</p>}
                    {error && <p></p>}

                    <h1 className="page-title">Buy Products</h1>
                    {/*<div className="grid-container">*/}
                    <div className="grid-product-container">
                        {
                            products.map((product) => {
                                return (

                                    // <article className="grid-box"
                                    //          key={product.id}>

                                        <Link key={product.id} to={`/product/${product.id}`}>

                                            {/*<Picture*/}
                                            {/*    className="image-wrapper-product-grid"*/}
                                            {/*    img={product.img}*/}
                                            {/*    imgTitle={product.title}*/}
                                            {/*/>*/}

                                            <Product
                                                // className="grid-box"
                                                className="grid-product-tile"
                                                id={product.id}
                                                img={product.img}
                                                title={product.title}
                                                description={product.description}
                                                price={product.price}
                                            />

                                            {/*<Button*/}
                                            {/*    className="buy-button"*/}
                                            {/*    type="submit"*/}
                                            {/*    visibleText="Buy"*/}
                                            {/*/>*/}

                                        </Link>
                                    // </article>

                                )
                                            })
                                            }
                                        </div>
                                    </div>
                            </main>
                            </>
                            )
                                ;
                            }

                            export default Products;
