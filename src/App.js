import { useState } from 'react';
import './App.css';

const fileApi = window.files;

const renderInput = (setFilePath, loadFileNames) =>
  <>
  <span>Enter path to tables:</span>
  <input type="text" onChange={e => setFilePath(e.target.value)}></input>
  <button onClick={loadFileNames}>Go</button>
  </>;

const renderTables = (fileNames) =>
  <>
  <h2>Available Tables</h2>
  <ul>
    {
      fileNames.map(f => <li key={f}>{f}</li>)
    }
  </ul>
  </>;

function App() {

  const [filePath, setFilePath] = useState('');
  const [fileNames, setFileNames] = useState([]);

  const loadFileNames = () => {
    setFileNames(fileApi.getTableFiles(filePath));
  }

  return (
    <div className="App">
      {fileNames.length ? renderTables(fileNames) : renderInput(setFilePath, loadFileNames) }
    </div>
  );
}

export default App;
