import { useEffect, useState } from 'react';
import './App.css';

const { fileApi } = window;

const renderFileName = fileName => fileName.split('.vpx')[0];

const renderInput = (setFilePath, loadFileNames) =>
  <div id="file-path-input">
    <span>Enter path to tables:</span>
    <input type="text" onChange={e => setFilePath(e.target.value)}></input>
    <button onClick={loadFileNames}>Go</button>
  </div>;

const renderTables = (fileNames, handleClick) =>
  <div id="tables">
    <h2>Available Tables</h2>
    <div id="tables-grid">
      {
        fileNames.map(f => <div className="table" onClick={() => handleClick(f)} key={f}>{renderFileName(f)}</div>)
      }
    </div>
  </div>;

function App() {

  const [filePath, setFilePath] = useState('F:/Pinball/Visual Pinball/Tables');
  const [fileNames, setFileNames] = useState([]);

  const loadFileNames = () => {
    setFileNames(fileApi.getTableFiles(filePath));
  }

  const loadTable = (fileName) => {
    fileApi.playTable(filePath + '/' + fileName);
  }

  return (
    <div className="App">
      {fileNames.length ? renderTables(fileNames, loadTable) : renderInput(setFilePath, loadFileNames) }
    </div>
  );
}

export default App;
