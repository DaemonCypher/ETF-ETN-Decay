import React, { useState } from 'react';
import './App.css';


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
        const processedData = processData(data); 
        setApiResponse(processedData);
    } catch (error) {
        console.error('There was a problem fetching data:', error);
        setApiResponse({ error: 'Failed to fetch data' });
    } finally {
        setLoading(false);
    }
};

  

  // Process the data as needed for your application
  function processData(data) {
    // Implement your data processing logic here
    return data;
  }

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
          <button type="submit" disabled={loading}>Submit</button>
        </form>
        {loading && <p>Loading...</p>}
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
