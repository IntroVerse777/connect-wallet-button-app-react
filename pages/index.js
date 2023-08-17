import React, { useState } from "react";
import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

function Home() {
  const [busdToSpend, setBusdToSpend] = useState(0);
  const [gamfiToReceive, setGamfiToReceive] = useState(0);
  const [currentTokenPrice, setCurrentTokenPrice] = useState(0.025); // Set your token price here

  const totalSupply = 10000000; // Total supply of GamFi tokens in the first phase presale
  const tokensSold = 1000452; // Number of tokens already sold

  const handleCalculate = () => {
    const busdAmount = parseFloat(busdToSpend);
    const gamfiAmount = busdAmount / currentTokenPrice;
    setGamfiToReceive(gamfiAmount);
  };

  const handleBusdToSpendChange = (event) => {
    setBusdToSpend(event.target.value);
  };

  const calculateProgressPercentage = () => {
    return (tokensSold / totalSupply) * 100;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>First Phase</h1>
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      </div>

      <div className={styles.tokenPrice}>
        <p>Current $GamFi Price: {currentTokenPrice} BUSD</p>
      </div>

      <div className={styles.progress}>
        <p className={styles.progressLabel}>Tokens Sold: {tokensSold} / {totalSupply}</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${calculateProgressPercentage()}%` }}></div>
        </div>
      </div>

      <div className={styles.claimContainer}>
        <input
          type="number"
          value={busdToSpend}
          onChange={handleBusdToSpendChange}
          className={styles.tokenInput}
          placeholder="YOU SPEND BUSD"
        />
        <Web3Button
          contractAddress="0x56B4AE8Ea01a99b44570d37B0D777B145Ee05F3E"
          action={(contract) => contract.erc20.claim(1)}
          onSuccess={() => alert("Success")}
        >
          Buy Now
        </Web3Button>
        <p className={styles.tokensReceived}>You will receive: {gamfiToReceive} GamFi</p>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
    </div>
  );
}

export default Home;

