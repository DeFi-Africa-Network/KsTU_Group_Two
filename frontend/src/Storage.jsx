import React, {useState, useEffect} from "react";
import "./Storage.css"

const Storage = () =>{
  const [showCurrentNumber, setShowCurrentNumber] = useState(null)
  const [connectWallet, setConnectWallet] = useState("Connect Wallet")
  const [showAddress, setShowAddress] = useState("Not connected yet.")
  const [contract, setContract] = useState(null)

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"

  const walletConnectHandler = () =>{
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        setShowAddress(result[0])
        setConnectWallet("Wallet is connected")
        loadBlockchainData()
      })
    }
  }

  const loadBlockchainData = async() =>{
    let provider =  new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner()
    let dataFromContract = new ethers.Contract()
    setContract(dataFromContract)
  }

  const handleSubmitData = (e) => {
    e.preventDefault();
    contract.store(e.target.setNumber.value);
    e.target.reset();
  }

const handleShowNumber = async() =>{
  let value = await contract.retrieve();
  setShowCurrentNumber(value.toString())
}

  return(
    <div className="container">
      <h1>The Storage dApp</h1>
      <button className="btn1" onClick={walletConnectHandler}>{connectWallet}</button>
      <p>Address: {showAddress}</p>
      
      <form onSubmit={handleSubmitData}>
        <label htmlFor="setNumber">Type Number</label>
        <input type="number" id="setNumber"/><br/>
        <button type={'submit'} className="btn2">Store Number</button>
      </form>

      <button onClick={handleShowNumber} className="btn3">Retrieve Number</button>
      <div className="display">{showCurrentNumber}</div>
    </div>
  );
}

export default Storage;