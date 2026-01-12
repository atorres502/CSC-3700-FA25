import React from 'react';
import { useState } from 'react';

function RightSideV2(props) {
    const title = 'Best Column Ever';
    const heroes = [
        { id: 'hulk',   name: 'Hulk',      power: 'Smash',     age: 135 },
        { id: 'spidey', name: 'Spiderman', power: 'Webs',      age: 17  },
        { id: 'iron',   name: 'Iron Man',  power: 'The Suit',  age: 45  },
    ];

    const [gotMilk, setGotMilk] = useState(true);
    const buttonVal = "Toggle Milk";

    function handleClick() {
        setGotMilk(!gotMilk);
        alert(gotMilk);
    }
    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>{buttonVal}</button>
            <h2>Got Milk: {gotMilk ? "Yes" : "No"}</h2>
        </>
    );
}

export default RightSideV2;