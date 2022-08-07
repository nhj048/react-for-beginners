import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [available, setAvailable] = useState(0);

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value));
    setAvailable(event.target.value / coinValue);
  }

  const onChangeCoins = (event) => {
    setCoinValue(Number(event.target.value));
    setAvailable(amount / event.target.value);
  }

  const onReset = () => {
    setAmount(0);
    setCoinValue(0);
    setAvailable(0);
  }

  console.log(amount, coinValue);
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <button onClick={onReset}>Reset</button>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <span>구매 가능 갯수: {coinValue > 0 ? available : "Please Select Coin"}</span>
      <br />
      {loading ? <strong>Loading...</strong> : null}
      {loading ? null : (
        <select onChange={onChangeCoins} value={coinValue}>
          <option value={0}>Choice Coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
