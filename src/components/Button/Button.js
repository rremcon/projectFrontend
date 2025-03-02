import React from 'react';
import './Button.css'

// Use of callback-property.
    function Button({className, type, onClick, disabled, visibleText}) {


    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {visibleText}
        </button>
    );
}

export default Button;




