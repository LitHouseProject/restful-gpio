import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [status, setStatus] = useState('off');
  console.log(status)
  
  // make the GET request to the API
  useEffect( () => {
    fetch('pins/3', {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'state' : status
      })
    })
    .then( response => {
      if (response.ok){
        return response.json()
      }
    })
    .then(data => console.log(data))
  }, [status])
  
  
  return (
    <div>
      <button
        onClick={() => setStatus( status === 'off' ? 'on' : 'off' )}
      >
      STATUS
      </button>
    </div>
  );
}

export default App;
