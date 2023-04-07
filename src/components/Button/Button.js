import React from 'react';
import './Button.css'

function Button({className, type, clickHandler, children}) {

    return (
        <button
            className={className}
            type={type}
            onClick={clickHandler}
            >
            {children}
        </button>
    );
}

export default Button;







