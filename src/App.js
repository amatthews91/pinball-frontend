import { useEffect, useState } from 'react';
import './App.css';

const { fileApi, settingsApi } = window;

const settings = settingsApi.getAppSettings();
const renderFileName = fileName => fileName.split('.vpx')[0];

const renderError = (err) =>
  <div id="error">
    <h2>{err}</h2>
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

  const [filePath] = useState(settings.tableDir);
  const [fileNames, setFileNames] = useState([]);

  const loadTable = (fileName) => {
    fileApi.playTable(filePath + '/' + fileName);
  }

  useEffect(() => {
    if (filePath) {
      setFileNames(fileApi.getTableFiles(filePath));
    }
  }, [filePath]);

  return (
    <div className="App">
      {filePath ? renderTables(fileNames, loadTable) : renderError('No filepath found, set tableDir value in settings.json') }
    </div>
  );
}

export default App;
