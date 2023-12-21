import React, { useState } from 'react';
import './App.css';

function App() {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiResponse(null); // Reset the response for each new request

    try {
      const response = await fetch(`http://localhost:5000/get_decay_data?stock=${ticker}&start_date=${startDate}&end_date=${endDate}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data); // Update the state with the response data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setApiResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
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
          <button type="submit">Submit</button>
        </form>
        {apiResponse && (
          <div className="response">
            <h2>API Response</h2>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
