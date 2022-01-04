import React from 'react'

function Image({id}) {
    return (
        <div>
            <div>
            <img src={process.env.PUBLIC_URL + `/avatar/tiger-${id}.png`} alt="Your avatar should be displayed here."></img>
            <h3>{`tiger-${id}`}</h3>
            </div>
        </div>
    )
}

export default Image
