import React from 'react';
import './Product.css'
import Button from "../Button/Button";
import Picture from "../Picture/Picture";
import {Link} from "react-router-dom";

function Product({className, id, img, title, description, price}) {

    return (
        <>
                <div className={className}>

                    {/*<h1>Product {id}</h1>*/}

                    <Picture
                        className="image-wrapper-product-grid"
                        img={img}
                        imgTitle={title}
                    />

                    <div>
                    <h3 className="box-title">{title}</h3>
                    <br/>
                    <p className="box-content">{description}</p>
                    <br/>
                    <span className="box-price">€{price}</span>
                    <br/>
                    </div>

                    <Button
                        className="buy-button"
                        type="submit"
                        // visibleText="Buy"
                        visibleText="sold out"
                    />

                </div>
        </>

                );
                }

                export default Product;
