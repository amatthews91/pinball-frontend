import { useEffect, useState } from 'react';
import './App.css';

const fileApi = window.files;

const renderFileName = fileName => fileName.split('.vpx')[0];

const renderInput = (setFilePath, loadFileNames) =>
  <div id="file-path-input">
    <span>Enter path to tables:</span>
    <input type="text" onChange={e => setFilePath(e.target.value)}></input>
    <button onClick={loadFileNames}>Go</button>
  </div>;

const renderTables = (fileNames) =>
  <div id="tables">
    <h2>Available Tables</h2>
    <div id="tables-grid">
      {
        fileNames.map(f => <div className="table" key={f}>{renderFileName(f)}</div>)
      }
    </div>
  </div>;

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
