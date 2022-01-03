import React, {useContext} from 'react'
import BlockchainContext from '../BlockchainContext.js'

function Header() {
    const blockchainContext = useContext(BlockchainContext);
    const {accounts} = blockchainContext;

    return (
        <div>
            <nav>
          <a
           className='mainHeader'
            href="http://joyjww.github.io/cryptopunks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avatar Minting
          </a>
          <ul>
            <li>
              <small><span>{accounts[0]}</span></small>
            </li>
          </ul>
        </nav>
        </div>
    )
}

export default Header
