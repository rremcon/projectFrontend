import React, {useContext} from "react";
import {ClickContext} from "../../context/ClickContext";

function MinButton() {

    const {minOneFunction, clicks} = useContext(ClickContext)

    return (
        <button type="button"
                className="quantity-button"
                onClick={minOneFunction}
                disabled={clicks === 0}
        >
            -
        </button>
    );
}

export default MinButton;