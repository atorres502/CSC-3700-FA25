import React from 'react';
import { useState } from 'react';

function RightSideV3(props) {
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

    const[selectedHeroId, setSelectedHeroId] = useState(null);
    //?? null isnt necessary just explicitly declared
    const selectedHero = heroes.find((hero) => hero.id === selectedHeroId) ?? null;
    return (
        <>
            <button className="btn btn-primary" onClick={handleClick}>{buttonVal}</button>
            <h2>Got Milk: {gotMilk ? "Yes" : "No"}</h2>
            <h2>Super Buttons</h2>
            {heroes.map((hero, i) => {
                const isActive = hero.id === selectedHeroId;
                return (
                    <button className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-info'}`} onClick={() => setSelectedHeroId(hero.id)}
                            key={hero.id}>{hero.name}</button>
                )
            })}
            <h2>Selected Hero</h2>
            {selectedHero ? <>Name:{selectedHero.name} Power: {selectedHero.power} </> : <>No hero selected</>}
        </>
    );
}

export default RightSideV3;