import React from 'react'

function Image({avatars, number}) {
    return (
        <div>
            {avatars.filter(avatar => avatar.id === number).map(avatar => 
            (<div key={avatar.id}>
            <img  src={process.env.PUBLIC_URL + `/avatar/${avatar.title}.png`} alt="Your avatar should be displayed here."></img>
            <h3>{avatar.title}</h3>
            </div>))}
        </div>
    )
}

export default Image
