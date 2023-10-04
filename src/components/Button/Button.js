import React from 'react';
import './Button.css'

// Alleen in het Button-component is een callback-property gebruikt.
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




