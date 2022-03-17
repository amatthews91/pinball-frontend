import { useEffect, useState } from 'react';
import './App.css';

const fileApi = window.files;

const renderInput = () => {

};

const renderTables = () => {

}

function App() {

  const [fileNames, setFileNames] = useState([]);
  // useEffect(() => setFileNames(fileApi.getTableFiles()), []);

  return (
    <div className="App">
      {fileNames ?
          <>
          <h2>Available Tables</h2>
          <ul>
            {
              fileNames.map(f => <li key={f}>{f}</li>)
            }
          </ul>
          </>
        :
          <p>No Files Available</p>
      }

    </div>
  );
}

export default App;
