import React, { useState } from 'react';
import './App.css';
import etfs from './etfs'; // Importing the ETFs array

function App() {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiResponse(null); 
    setLoading(true);

    try {
        const response = await fetch('/api/divergence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker, startDate, endDate }),
        });
        const data = await response.json();

        setApiResponse(data);
    } catch (error) {
        console.error('There was a problem fetching data:', error);
    setApiResponse({ error: `Failed to fetch data: ${error.message}` });
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="App">
    <header className="App-header">  

      <img src="/logo.png" alt="logo" className="App-logo" />
      <h1 className="App-title">ETF Divergence Analysis</h1> {/* Add a title */}
      
        <form onSubmit={handleSubmit}>
          <label>
            Ticker Symbol:
            <input type="text" value={ticker} onChange={e => setTicker(e.target.value)} />
          </label>
          <br />
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </label>
          <br />
          <label>
            End Date:
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </label>
          <br />
          <button type="submit" disabled={loading}>Submit</button>
        </form>
        {loading && <p>Loading...</p>}
        {apiResponse && (
          <div className="response">
            <h2>Result</h2>
            <pre>
              {JSON.stringify(apiResponse, null, 2)}
              
            </pre>

          </div>
        )}
      <div className="etf-list">
        <h2>ETF List</h2>
        <ul>
          {etfs.map((etf, index) => (
            <li key={index}>
              {`Ticker: ${etf.ticker}, Leverage: ${etf.leverage}, Asset: ${
                typeof etf.asset === 'object' ? JSON.stringify(etf.asset) : etf.asset
              }`}
            </li>
          ))}
        </ul>
      </div>
    </header>
   
    </div>
  );
}

export default App;
