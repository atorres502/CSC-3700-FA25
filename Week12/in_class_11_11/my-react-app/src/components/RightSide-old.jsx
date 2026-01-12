import React from 'react';
import homer from "../assets/homer.gif";

function RightSideOld(props) {
    return (
        <>
            <h2>This Is Right</h2>
            <button className="btn btn-primary"> Click me</button>
            <span className="special"> Does this work?</span>
            <img src={homer} className="homer" alt="homer" loading="lazy" />
            <img src="homer2.png" className="homer" alt="homer2" loading="lazy" />
        </>
    );
}

//export default RightSideOld;