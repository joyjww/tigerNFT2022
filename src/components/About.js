import React from 'react'
// import Me from '../Me.png'
import Me from '../Untitled-1.png'

function About() {
    return (
        <div className="About">
           <img className="SelfImage" src={Me} alt='My Pixel Self should be displayed here'/>
           <p>Hello, welcome to this Avatar Random Generating and Minting Game. <br/>
           I have designed couple of avatars that I hope you will find it interesting or sth nice to have!<br/>
           This is a small experiment project inspired by ERC721, Cryptopunks, and OpenSea. <br/> 
           Thanks to the blockchain and crypto community!<br/>
           twitter: @WeiweiJiang7
           </p>
           <a href='/'>Go Back</a>
        </div>
    )
}

export default About
