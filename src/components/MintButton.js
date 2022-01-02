import React from "react";

function MintButton({mint, minted}) {

    return (
        <div>{minted ?
            <button className="Unmintable">Mint</button> :
            <button className="Mintable" onClick={mint}>Mint</button>
            } 
        </div>
    )
}

export default MintButton
