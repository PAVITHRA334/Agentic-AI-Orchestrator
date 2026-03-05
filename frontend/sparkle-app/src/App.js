import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [decision, setDecision] = useState("Awaiting System Input...");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/decide', { liveData: inputValue });
      setDecision(res.data.decision);
    } catch (err) {
      setDecision("Connection Error: Is the backend server running?");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#eef2f3', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>✨ Sparkle Stars: AI Agentic Monitor</h1>
      <p style={{ color: '#7f8c8d' }}>Real-time Grid Decision System</p>

      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'inline-block', width: '400px' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#34495e' }}>Historical Benchmark: 100 Units</h3>
        
        <input 
          type="number" 
          placeholder="Enter Live Units..." 
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '12px', width: '80%', borderRadius: '8px', border: '2px solid #ddd', fontSize: '16px' }}
        />
        
        <br /><br />
        
        <button 
          onClick={handlePredict} 
          disabled={loading}
          style={{ padding: '12px 25px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          {loading ? "Analyzing..." : "Ask AI Agent"}
        </button>

        <div style={{ marginTop: '30px', borderTop: '2px solid #f1f1f1', paddingTop: '20px' }}>
          <h4 style={{ color: '#95a5a6', textTransform: 'uppercase', fontSize: '12px' }}>Operational Decision:</h4>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50', lineHeight: '1.4' }}>
            {decision}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;