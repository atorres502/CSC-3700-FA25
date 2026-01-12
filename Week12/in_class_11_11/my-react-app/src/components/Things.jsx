import React from 'react';

function Things(props) {
    let first = "Walk 2 Miles"
    const listStyle = {
        backgroundColor: 'green',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'left'
    }
    const bigger = {
        fontSize: '32px',
    }
    const myType = {
        fontStyle: 'italic',
    }

    return (
        <div>
            <ol style={listStyle}>
                <li style={bigger}>{first}</li>
                <li style={{...bigger, ...myType}}>Thing 2</li>
                <li>Thing 3</li>

                <li style={{color:'red', backgroundColor:'blue'}}>Thing 4</li>
            </ol>
        </div>
    );
}

export default Things;