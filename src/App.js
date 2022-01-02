import { useState, useEffect } from 'react';
import './App.css';
import UnknownAvatar from './UnknowAvatar.png';

import GenerateButton from './components/GenerateButton.js';
import Image from './components/Image.js';
import MintButton from './components/MintButton.js';
import Header from './components/header.js';
import Footer from './components/Footer';

import Cryptopunks from './artifacts/cryptopunks.json'
import getWeb3 from './getWeb3';
import BlockchainContext from './BlockchainContext';

function App() {
  const [number, setNumber] = useState(0);
  const [toggleshow, setToggleshow] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(undefined)
  const [minted, setMinted] = useState(false);

  useEffect(() => {
    const getAvatars = async () => {
      const avatarsFromServer = await fetchAvatars()
      setAvatars(avatarsFromServer)
    }

    getAvatars()
  }, [])

  useEffect(() => {
    const init = async () => {

      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Cryptopunks.networks[networkId];
        const instance = new web3.eth.Contract(
          Cryptopunks.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    async function listenMMAccount() {
      window.ethereum.on("accountsChanged", async function(accounts) {
        // Time to reload your interface with accounts[0]!
        const Accounts = accounts
        // accounts = await web3.eth.getAccounts();
        setAccounts(Accounts);
      });
    }

    init()
    listenMMAccount();
  }, [web3, contract, accounts])

  const fetchAvatars = async () => {
    const res = await fetch('http://localhost:5000/avatars/')
    const data = await res.json()

    return data
  }

  const fetchAvatar = async (number) => {
    const res = await fetch(`http://localhost:5000/avatars/${number}`)
    const data = await res.json()

    return data
  }

  const reverseBack = async () => {
    setToggleshow(!toggleshow)
  }
  //  回头看一下 function mint是怎么回事

  const onClick = async () => {
    const avatarToChange = await fetchAvatar(Math.floor(Math.random() * 4))
    setNumber(avatarToChange.id)
    const response = await contract.methods.getExists(avatarToChange.title).call()
    setMinted(response)
    console.log(avatarToChange.title, response)
    setToggleshow(!toggleshow)
  }

  const mint = async () => {
    const avatarToChange = await fetchAvatar(number)
    await contract.methods.Claim(avatarToChange.title).send({ from: accounts[0] })
    const response = await contract.methods.getExists(avatarToChange.title).call()
    setMinted(response)
    console.log(avatarToChange.title, response)
  }

  return (
    <div className="App">
            <BlockchainContext.Provider value={{ web3, accounts, contract }}>
        <Header />
        <h1>Mint your new Avatar</h1>
        <div>
        {toggleshow ? (<Image avatars={avatars} number={number} />) : (<img src={UnknownAvatar} alt="Your avatar should be displayed here."></img>)}
        </div>
        <GenerateButton reverseBack={reverseBack} onClick={onClick} toggleshow={toggleshow} />
        <MintButton mint={mint} minted={minted} />
        </BlockchainContext.Provider>
        <Footer />
    </div>
  );
}

export default App;
