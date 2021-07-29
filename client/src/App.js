import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.scss';
import Trade from './components/trade/trade.component';

function App() {
  const [trades, setData] = useState(null);

  useEffect(() => {
    const getTrades = async () => {
      const res = await axios.get('trades');
      const trades = JSON.parse(res.data.trades);

      setData(trades);
    };
    getTrades();
  }, []);

  console.log(trades);

  return (
    <div className='App'>
      <h1 className='title'>Trades</h1>
      <div className='trades'>
        {trades &&
          trades.map((trade, index) => <Trade trade={trade} key={index} />)}
      </div>
    </div>
  );
}

export default App;
