import { useState } from 'react';
import './App.css';
import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const App = () => {
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const onDownload = async () => {
    if (input.length !== 0) {
      try {
        setDisabled(true);
        const res = await axios.post(`${baseUrl}/process`, { url: input }, {
          responseType: 'blob'
        });
        const res2 = await axios.get(`${baseUrl}/videoInfo`, { params: { param1: input } });
        const url = URL.createObjectURL(res.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${res2.data}.mp3`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 0);
        setInput('');
        setDisabled(false);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  }

  return (
    <>
      <div className="container">
        <input onChange={(e) => setInput(e.target.value)} value={input} className="item" type="text" />
        <button disabled={disabled} onClick={onDownload} className="item">{disabled ? 'Wait ...' : 'Download'}</button>
      </div>
    </>
  )
}

export default App
