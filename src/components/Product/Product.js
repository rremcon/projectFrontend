import React from 'react';
import './Product.css'

function Product({className, id, img, title, description, price}) {

    return (
        <>
            <div className={className}>
                {/*<h1>Product {id}</h1>*/}
                <br/>
                <img src={img} alt={title}/>
                <h1>{title}</h1>
                <p>{description}</p>
                <br/>
                <span>€{price}</span>
                <br/>
                <br/>
            </div>
        </>
    );
}

export default Product;
