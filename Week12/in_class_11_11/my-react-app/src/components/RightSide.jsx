import React from 'react';
import homer from "../assets/homer.gif";

function RightSide(props) {
    const myName = "Jeff"
    const myTasks = [
        {text : "Walk a a mile", color: 'red', backgroundColor: 'yellow'},
        {text : "Ride the bike", color: 'blue', backgroundColor: 'orange'},
        {text : "Drive the car", color: 'green', backgroundColor: 'purple'},
    ]
    function countColor(color){
        return myTasks.filter(item => item.color === color).length;
    }
    let gotMilk = true;
    function reverseMilk() {
        gotMilk ? gotMilk = false : gotMilk = true;
        return gotMilk
    }

    return (
        <>
            <h2>This Is Right {myName}</h2>
            <ol>
                {myTasks.map(( task, index) => {
                    return(<li
                        key={index} style={{color: task.color, backgroundColor: task.backgroundColor}} >
                        {task.text}
                    </li>)
            })}
                <p>how many? {countColor('yellow')}</p>
                <h2>Got Milk: {gotMilk ? "Yes" : "No"}</h2>
                <button onClick={reverseMilk()}>Got Milk</button>
            </ol>
        </>
    );
}

export default RightSide;