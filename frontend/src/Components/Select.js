import React, { useState } from 'react';
import flags from '../Utils/flags';
// import countries from '../Utils/countrycodes';

let isselected = false;
let countryCode;
function Select() {
    const [code, setCode] = useState("");

    function handleClick(e) {
        if (isselected === false || code === "") {
            return;
        }
        isselected = !isselected;
    }

    function handleChange(e) {
        if (isselected) {
            isselected = !isselected;
            return;
        }
        setCode(e.target.value);
        isselected = !isselected;

    }

    countryCode = code;

    return (
        <select name="countryCode" id="countryCode" onChange={handleChange} onClick={handleClick}>

            {flags.map((cc, index) => {
                return (
                        <option key={index}>{isselected ? cc.number : cc.number + " " + cc.name}</option>
                )
            })
        }
        </select>
    );
};

export { Select, countryCode };